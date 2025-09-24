import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [mode, setMode] = useState("Gain"); // Default
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("questioning");
  const [isSatisfied, setIsSatisfied] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [error, setError] = useState(null);
  const [retryAfter, setRetryAfter] = useState(null);

  const sendMessage = async () => {
    if (!input || isLoading) return;
    
    // If session is complete (either mode), automatically reset for new session
    if (sessionComplete || (mode === "Think" && isSatisfied) || (mode === "Gain" && currentPhase === "answering")) {
      setIsSatisfied(false);
      setSessionComplete(false);
      setCurrentPhase("questioning");
    }
    
    setIsLoading(true);
    const userMsg = { sender: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    const requestBody = {
      message: input,
      mode,
      session_id: sessionId,
      conversation_history: newMessages
    };

    try {
      setError(null); // Clear any previous errors
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      
      if (!res.ok) {
        if (res.status === 429) {
          // Rate limit exceeded
          const retryAfterSeconds = res.headers.get('Retry-After') || 60;
          setRetryAfter(parseInt(retryAfterSeconds));
          setError(`API limit exceeded. Please try again in ${retryAfterSeconds} seconds.`);
          
          // Start countdown timer
          const timer = setInterval(() => {
            setRetryAfter((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                setError(null);
                return null;
              }
              return prev - 1;
            });
          }, 1000);
          
          return;
        } else {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
      }
      
      const data = await res.json();

      // Update session state
      if (data.session_id) {
        setSessionId(data.session_id);
      }
      if (data.phase) {
        setCurrentPhase(data.phase);
      }
      if (data.satisfied !== undefined) {
        setIsSatisfied(data.satisfied);
        // If Think session restarted (was satisfied but now isn't), reset session complete
        if (mode === "Think" && !data.satisfied && sessionComplete) {
          setSessionComplete(false);
        }
      }

      // Mark as session complete for final answers
      const isSessionEnd = (mode === "Gain" && data.phase === "answering") || 
                          (mode === "Think" && data.satisfied);
      
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: data.reply, 
        isSessionEnd,
        sessionMode: mode
      }]);
      
      if (isSessionEnd) {
        setSessionComplete(true);
      }
      
      setCurrentQuestionIndex(prev => prev + 1);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError(`Failed to send message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setSessionId(null);
    setCurrentPhase("questioning");
    setIsSatisfied(false);
    setCurrentQuestionIndex(0);
    setSessionComplete(false);
    setError(null);
    setRetryAfter(null);
  };
  
  const startNewChat = () => {
    resetConversation();
  };
  
  const switchMode = (newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      // Don't reset conversation - allow mode switching within same chat
      setCurrentPhase("questioning");
      setIsSatisfied(false);
      setSessionComplete(false);
    }
  };

  const getCurrentQuestion = () => {
    const botMessages = messages.filter(m => m.sender === 'bot');
    return botMessages[botMessages.length - 1];
  };

  const getUserAnswers = () => {
    return messages.filter(m => m.sender === 'user');
  };

  const getModeDescription = () => {
    if (mode === "Gain") {
      return currentPhase === "questioning" 
        ? "🔍 Gaining clarity - I'll ask questions first, then provide a comprehensive answer"
        : "💡 Ready to provide your answer based on our discussion";
    } else {
      return isSatisfied 
        ? "✅ Thinking session complete - Ready for a new topic"
        : "🤔 Think mode - Exploring your thoughts together";
    }
  };

  const getInputPlaceholder = () => {
    if (mode === "Gain" && currentPhase === "questioning") {
      return "Answer my questions or type 'ready for answer' when done...";
    } else if ((mode === "Think" && isSatisfied) || sessionComplete) {
      return `Ask a new question to start another ${mode.toLowerCase()} session...`;
    } else {
      return "Share your thoughts...";
    }
  };

  const currentQuestion = getCurrentQuestion();
  const userAnswers = getUserAnswers();

  return (
    <div className="chat-fullscreen">
      {/* Header Bar */}
      <div className="chat-header">
        <div className="header-left">
          <span className="brand-text">cerebrize</span>
        </div>
        <div className="header-center">
          {/* Mode Toggle Switch */}
          <div className="mode-toggle">
            <div className={`toggle-option ${mode === 'Gain' ? 'active' : ''}`} onClick={() => switchMode('Gain')}>
              Gain
            </div>
            <div className={`toggle-option ${mode === 'Think' ? 'active' : ''}`} onClick={() => switchMode('Think')}>
              Think
            </div>
            <div className={`toggle-slider ${mode === 'Think' ? 'right' : 'left'}`}></div>
          </div>
        </div>
        <div className="header-right">
          <button onClick={startNewChat} className="new-chat-btn">
            + New Conversation
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-content">
              <h2>Welcome to Cerebrize</h2>
              <p>
                {mode === "Gain" 
                  ? "I'll ask clarifying questions first, then provide a comprehensive answer"
                  : "Let's explore your thoughts together through guided questions"
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message, index) => (
              <div key={index} className={`message-bubble ${
                message.sender === 'user' ? 'user-message' : 
                message.isSessionEnd ? `bot-message session-end ${message.sessionMode.toLowerCase()}-mode` :
                'bot-message'
              }`}>
                {message.sender === 'bot' && (
                  <div className="bot-avatar">
                    <img src="src/assets/icons/logo.png" alt="Brain Icon" className="brain-icon" />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">
                    {message.sender === 'bot' ? (
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    ) : (
                      message.text
                    )}
                  </div>
                  {message.isSessionEnd && (
                    <div className="session-badge">
                      {message.sessionMode === 'Gain' ? 'Final Answer' : 'Session Complete'}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-bubble bot-message">
                <div className="bot-avatar">
                  <img src="src/assets/icons/logo.png" alt="Brain Icon" className="brain-icon" />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
            {retryAfter && (
              <span className="retry-countdown">Retry in {retryAfter}s</span>
            )}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="input-section">
        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={messages.length === 0 ? 
              (mode === "Gain" ? "What would you like help with?" : "What's on your mind?") :
              getInputPlaceholder()
            }
            className="message-input"
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage} 
            disabled={!input.trim() || isLoading || error}
            className="send-btn"
          >
            {isLoading ? "..." : "↑"}
          </button>
        </div>
        
        {/* Quick Actions */}
        {messages.length > 0 && (
          <div className="quick-actions">
            {mode === "Gain" && currentPhase === "questioning" && !isLoading && (
              <button 
                onClick={() => setInput("That's all the information I have. Please provide your answer now.")}
                className="quick-btn"
              >
                Ready for Answer
              </button>
            )}
            {mode === "Think" && !isSatisfied && messages.length > 2 && !isLoading && (
              <button 
                onClick={() => setInput("I'm satisfied with our exploration. Thank you.")}
                className="quick-btn"
              >
                I'm Satisfied
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}   
