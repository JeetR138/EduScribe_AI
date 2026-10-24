const express = require('express');
const db = require('../database');
const { authenticateToken } = require('../middleware/authMiddleware');
const Groq = require('groq-sdk');

const router = express.Router();

let groqClient = null;
const initGroq = () => {
    if (!groqClient) {
        groqClient = new Groq({
            apiKey: process.env.GROQ_API_KEY || 'MISSING_API_KEY'
        });
    }
    return groqClient;
};

// @route   POST /api/chat/assistant
// @desc    Global AI Doubt Assistant & Software Guide
router.post('/assistant', async (req, res) => {
    const { message, mode } = req.body; // mode: 'doubt' | 'guide'

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    let systemPrompt = '';
    if (mode === 'guide') {
        systemPrompt = `You are EduScribe AI Assistant, a friendly guide for the EduScribe AI platform.
EduScribe AI is an AI-Powered Lecture Recording and Smart Note Generation System.

Key Software Features & Instructions:
1. Live Lecture Recording: Teachers can record lectures directly using their microphone/earbuds in both Online and Offline modes. Audio is automatically transcribed into structured text using Speech-to-Text.
2. AI-Generated Summaries: Converts lectures into 3 summary levels - Easy (5 Points), Medium (10 Points), and Detailed (20 Points with examples).
3. AI Study Aids: Automatically generates 5 Flashcards, 5 MCQs (auto-graded quizzes), Key Concepts, and Topic Timestamps for revision.
4. Classroom Management: Teachers create classrooms and get unique join codes. Students join using join codes.
5. Student Dashboard: Access enrolled classrooms, view notes, solve quizzes, earn XP/Badges, and track progress.
6. Teacher Dashboard: Monitor student performance, identify struggling students needing help, and view classroom analytics.
7. Doubt Solving Chatbot: Ask doubts about any lecture or topic at any time.

Answer the user's question clearly, concisely, and helpfully regarding how to use EduScribe AI software. Keep response under 150 words.`;
    } else {
        systemPrompt = `You are EduScribe AI Academic Doubt Assistant.
Answer the student's question accurately, concisely, and educationally. Provide clear bullet points or step-by-step explanations when helpful. Keep response under 200 words.`;
    }

    try {
        const client = initGroq();
        const completion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            model: 'openai/gpt-oss-120b',
            temperature: 0.4,
            max_tokens: 1024,
        });

        const aiResponse = completion.choices[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response.";
        res.json({ answer: aiResponse });
    } catch (error) {
        console.error("Global Chat Assistant error:", error.message);
        res.status(500).json({ error: 'AI Assistant is currently unavailable. Please check server configuration.' });
    }
});

// @route   POST /api/chat/:lectureId
// @desc    Ask a question about a specific lecture transcript
router.post('/:lectureId', authenticateToken, async (req, res) => {
    const { lectureId } = req.params;
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Fetch transcript for the lecture
    db.get('SELECT transcript, title FROM Lecture WHERE lecture_id = ?', [lectureId], async (err, lecture) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!lecture) return res.status(404).json({ error: 'Lecture not found' });

        if (!lecture.transcript) {
            return res.status(400).json({ error: 'No transcript available for this lecture' });
        }

        const prompt = `
You are an AI study assistant for the lecture titled "${lecture.title}".
Based ONLY on the following lecture transcript, answer the student's question accurately and concisely.
If the answer is not in the transcript, state that clearly.

Lecture Transcript:
"${lecture.transcript}"

Student Question:
"${message}"

Helpful Response:
`;

        try {
            const client = initGroq();
            const completion = await client.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'openai/gpt-oss-120b',
                temperature: 0.4,
                max_tokens: 1024,
            });

            const aiResponse = completion.choices[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response.";
            res.json({ answer: aiResponse });
        } catch (error) {
            console.error("Chat Groq AI error:", error.message);
            res.status(500).json({ error: 'AI Assistant is currently unavailable. Please check your Groq API key.' });
        }
    });
});

module.exports = router;
