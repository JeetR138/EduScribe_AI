# EduScribe AI - Technical Documentation

**EduScribe AI** is an AI-powered lecture recording and smart note generation system designed for classrooms and interactive lecture experiences.

---

## 🚀 Core Features

### 1. AI-Powered Smart Note Generation
Transforms lecture audio into structured study material:
- **3 Summary Levels**:
  - **Easy (5 Points)**: High-level quick overview.
  - **Medium (10 Points)**: Balanced summary.
  - **Detailed (20 Points)**: In-depth breakdown with examples.
- **Interactive Flashcards**: Automatically generates 5 flashcards per lecture.
- **Auto-Quizzes**: Generates 5 MCQs with instant auto-grading.
- **Key Concepts & Timestamps**: Extracted key topics mapped to audio timeline.

### 2. Global AI Doubt & Software Assistant
Floating glassmorphic chatbot widget:
- **Doubt Solver**: Answers academic questions based on lectures or subjects.
- **Software Guide**: Assists users in navigating EduScribe AI (recording, joining classes, taking quizzes).

### 3. Classroom & Progress Tracking
- **Teacher Dashboard**: Create classrooms, record lectures, view analytics, and identify struggling students needing help.
- **Student Dashboard**: Join classrooms via join code, view notes, solve quizzes, and earn gamified XP badges.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Lucide Icons, Glassmorphic UI Design System.
- **Backend**: Node.js, Express.js.
- **Database**: SQLite (`eduscribe.db`).
- **AI Infrastructure**: Groq AI SDK (`openai/gpt-oss-120b` for notes & doubt chat, `whisper-large-v3-turbo` for STT).

---

## 📝 Setup & Running

1. **Start Backend**: `cd backend && node server.js` (Runs on `http://localhost:5050`)
2. **Start Frontend**: `cd frontend && npm run dev` (Runs on `http://localhost:5173`)

---
*EduScribe AI - 2026*
