import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, HelpCircle, BookOpen, Sparkles, User } from 'lucide-react';
import axios from 'axios';

const GlobalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('doubt'); // 'doubt' | 'guide'
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your **EduScribe AI Assistant**. Ask me any academic doubt or ask how to use EduScribe AI software!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsgList = [
      ...messages,
      { sender: 'user', text: userText, time: timeStr }
    ];
    setMessages(newMsgList);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat/assistant', {
        message: userText,
        mode: activeTab
      });

      const botReply = res.data.answer || "I am here to help! Could you please clarify your question?";
      setMessages([
        ...newMsgList,
        { sender: 'bot', text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (err) {
      setMessages([
        ...newMsgList,
        { sender: 'bot', text: "⚠️ AI Assistant is currently connecting to the server. Please try again shortly.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = activeTab === 'guide' ? [
    "How do I record a live lecture?",
    "How do the 3 summary levels work?",
    "How can students join a classroom?",
    "How does offline recording work?"
  ] : [
    "Explain Newton's Laws of Motion simply",
    "What is Photosynthesis and its formula?",
    "What are the main features of C++?",
    "Explain Artificial Intelligence concepts"
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, var(--primary-color, #6366f1), #8b5cf6)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50px',
            padding: '0.85rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 700,
            fontSize: '0.95rem',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(99, 102, 241, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.4)';
          }}
        >
          <Sparkles size={20} className="animate-pulse" />
          <span>EduScribe AI Helper</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '560px',
            maxHeight: 'calc(100vh - 48px)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: '#ffffff',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem', borderRadius: '50%', display: 'flex' }}>
                <Bot size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>EduScribe AI Helper</h3>
                <span style={{ fontSize: '0.72rem', opacity: 0.9 }}>Doubt Solving & Software Guide</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.3rem', gap: '0.25rem', borderBottom: '1px solid #e2e8f0' }}>
            <button
              type="button"
              onClick={() => setActiveTab('doubt')}
              style={{
                flex: 1,
                padding: '0.45rem',
                border: 'none',
                borderRadius: '0.6rem',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: activeTab === 'doubt' ? '#ffffff' : 'transparent',
                color: activeTab === 'doubt' ? '#4f46e5' : '#64748b',
                boxShadow: activeTab === 'doubt' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <BookOpen size={14} /> Doubt Solver
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              style={{
                flex: 1,
                padding: '0.45rem',
                border: 'none',
                borderRadius: '0.6rem',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: activeTab === 'guide' ? '#ffffff' : 'transparent',
                color: activeTab === 'guide' ? '#4f46e5' : '#64748b',
                boxShadow: activeTab === 'guide' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <HelpCircle size={14} /> Software Guide
            </button>
          </div>

          {/* Messages Container */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.75rem 1rem',
                    borderRadius: m.sender === 'user' ? '1.2rem 1.2rem 0.2rem 1.2rem' : '1.2rem 1.2rem 1.2rem 0.2rem',
                    background: m.sender === 'user' ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#f8fafc',
                    color: m.sender === 'user' ? '#ffffff' : '#1e293b',
                    border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {m.text}
                </div>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.25rem', padding: '0 0.3rem' }}>
                  {m.time}
                </span>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', fontSize: '0.82rem', fontWeight: 600, padding: '0.5rem' }}>
                <Bot size={16} className="animate-spin" />
                <span>EduScribe AI is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div style={{ padding: '0.5rem 0.75rem', background: '#faf5ff', borderTop: '1px solid #f3e8ff', display: 'flex', gap: '0.4rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setInput(q); }}
                style={{
                  whiteSpace: 'nowrap',
                  background: '#ffffff',
                  border: '1px solid #d8b4fe',
                  color: '#7e22ce',
                  borderRadius: '20px',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f3e8ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}
              >
                💡 {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '0.75rem',
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder={activeTab === 'guide' ? "Ask how to use EduScribe AI..." : "Ask your academic doubt..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.65rem 0.9rem',
                borderRadius: '0.8rem',
                border: '1.5px solid #cbd5e1',
                outline: 'none',
                fontSize: '0.85rem',
                color: '#0f172a'
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.8rem',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes chatPop {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default GlobalChatbot;
