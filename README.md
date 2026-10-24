# EduScribe AI

> **An AI-powered smart lecture recording, multi-tier note generation, and classroom diagnostic system.**

---

## 📖 Overview

**EduScribe AI** transforms spoken classroom lectures into structured, interactive digital study material. Engineered with an edge-cloud design, it bridges live classroom delivery and asynchronous student review through automated transcription, cognitive multi-level summaries, active-recall flashcards, and diagnostic educator telemetry.

---

## 🚀 Key Features

### 1. 🎙️ Lecture Recording & Speech-to-Text
- Seamless browser-based audio ingestion for lectures.
- High-fidelity speech-to-text pipeline transcribing lecture audio with timeline-synchronized indexing.

### 2. 🧠 Multi-Tier Cognitive Summarization
- **Easy (5 Points)**: Quick conceptual primer and overview for fast revision.
- **Medium (10 Points)**: Core syllabus summary balancing breadth and depth.
- **Detailed (20 Points)**: Granular, comprehensive breakdown with technical points and examples.

### 3. 🎯 Formative Assessments & Gamified Revision
- **Active Recall Flashcards**: 5 auto-generated flashcards per lecture for interactive self-testing.
- **Instant Quizzes (MCQs)**: 5 deterministic multiple-choice questions with real-time scoring and answer explanations.
- **XP & Gamification**: Rewards students with XP badges as they complete lectures and quizzes.

### 4. 🤖 Global AI Doubt & Software Assistant
- Embedded floating chatbot assistant.
- **Academic Doubt Solver**: Answers conceptual questions grounded in lecture topics.
- **Software Guide**: Step-by-step guidance on navigating classrooms, recordings, and quizzes.

### 5. 📊 Classroom & Learning Analytics
- **Teacher Dashboard**: Create classrooms, share join codes, manage lectures, and inspect student mastery and vulnerability metrics.
- **Student Dashboard**: Join classes via join code, organize bookmarks, review notes, and monitor individual learning velocity.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Lucide Icons, Glassmorphic CSS Design System |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite (Local-first, auto-initializing schema) |
| **AI Integration** | Groq SDK (`openai/gpt-oss-120b`, Whisper STT) |
| **Authentication** | JWT (JSON Web Tokens) with bcrypt password hashing |

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/eduscribe-ai.git
cd eduscribe-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and supply your GROQ_API_KEY and JWT_SECRET
node server.js
```
The backend server will run on `http://localhost:5050`.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```
The frontend application will run on `http://localhost:5173`.

---

## 📁 Project Structure

```text
├── backend/
│   ├── helpers/            # Audio processing utilities
│   ├── middleware/         # JWT authentication middleware
│   ├── routes/             # REST API routes (auth, lectures, classrooms, profiles, chat, analytics)
│   ├── database.js         # SQLite schema initialization
│   ├── package.json
│   ├── server.js           # Server entry point
│   └── .env.example
├── frontend/
│   ├── public/             # Static assets & icons
│   ├── src/
│   │   ├── components/     # UI components (Navbar, ThemeToggle, GlobalChatbot, ConfirmModal)
│   │   ├── pages/          # Student & Teacher view pages
│   │   ├── App.jsx         # App routing & layout
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── PROJECT_DOCS.md         # In-depth technical specification
├── WORK_DONE_SUMMARY.md    # Development journey summary
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License.
