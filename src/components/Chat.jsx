import { useState, useEffect } from "react";

export default function Chat() {
  const [mode, setMode] = useState("Gain"); // Default
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("questioning");
  const [isSatisfied, setIsSatisfied] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input || isLoading) return;
    
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
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
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
      }

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      setCurrentQuestionIndex(prev => prev + 1);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
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
    } else if (mode === "Think" && isSatisfied) {
      return "Start a new thinking session...";
    } else {
      return "Share your thoughts...";
    }
  };

  const currentQuestion = getCurrentQuestion();
  const userAnswers = getUserAnswers();

  return (
    <div className="chat-fullscreen">
      {/* Header Bar */}
      <div className="chat-topbar">
        <div className="chat-brand">
          <span className="brand-text">cerebrize</span>
          {/* <img src="src/assets/icons/logo.png" className="w-9 h-9" alt="Logo" /> */}
        </div>
        <div>
          <img src="src/assets/icons/logo.png" className="w-9 h-9" alt="Account PFP" />
        </div>
      </div>

      {/* Progress Indicator */}
      {messages.length > 0 && (
        <div className="progress-bar">
          <div className="progress-info">
            <span className="mode-badge">{mode}</span>
            <span className="question-counter">
              {mode === "Gain" && currentPhase === "questioning" && `Question ${Math.ceil(userAnswers.length + 1)}`}
              {mode === "Gain" && currentPhase === "answering" && "Final Answer"}
              {mode === "Think" && !isSatisfied && `Exploration ${userAnswers.length + 1}`}
              {mode === "Think" && isSatisfied && "Complete"}
            </span>
          </div>
          <div className="status-text">{getModeDescription()}</div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="chat-main">
        {messages.length === 0 ? (
          // Initial State
          <div className="welcome-screen">
            <div className="welcome-content">
              <h1 className="welcome-title">Welcome to Cerebrize</h1>
              
              {/* Mode Toggle Switch */}
              <div className="mode-toggle-container">
                <div className="mode-toggle">
                  <div className={`toggle-option ${mode === 'Gain' ? 'active' : ''}`} onClick={() => setMode('Gain')}>
                    Gain
                  </div>
                  <div className={`toggle-option ${mode === 'Think' ? 'active' : ''}`} onClick={() => setMode('Think')}>
                    Think
                  </div>
                  <div className={`toggle-slider ${mode === 'Think' ? 'right' : 'left'}`}></div>
                </div>
              </div>
              
              <p className="welcome-subtitle">
                {mode === "Gain" 
                  ? "I'll ask clarifying questions first, then provide a comprehensive answer"
                  : "Let's explore your thoughts together through guided questions"
                }
              </p>
              <div className="start-section">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={mode === "Gain" ? "What would you like help with?" : "What's on your mind?"}
                  className="start-input"
                  disabled={isLoading}
                />
                <button onClick={sendMessage} disabled={!input.trim() || isLoading} className="start-button">
                  {isLoading ? "Starting..." : "Begin"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Question/Answer Interface
          <div className="question-interface">
            {/* Mode Toggle in Chat */}
            <div className="chat-mode-toggle">
              <div className="mode-toggle">
                <div className={`toggle-option ${mode === 'Gain' ? 'active' : ''}`} onClick={() => {setMode('Gain'); resetConversation();}}>
                  Gain
                </div>
                <div className={`toggle-option ${mode === 'Think' ? 'active' : ''}`} onClick={() => {setMode('Think'); resetConversation();}}>
                  Think
                </div>
                <div className={`toggle-slider ${mode === 'Think' ? 'right' : 'left'}`}></div>
              </div>
            </div>
            
            {/* Current Question Card */}
            {currentQuestion && (
              <div className={`question-card ${mode === 'Gain' && currentPhase === 'answering' ? 'answer-mode' : ''}`}>
                <div className="question-header">
                  <span className="cerebrize-avatar">🧠</span>
                  <span className="cerebrize-name">Cerebrize</span>
                  {mode === 'Gain' && currentPhase === 'answering' && (
                    <span className="answer-badge">Final Answer</span>
                  )}
                </div>
                <div className="question-content">
                  <p className={`question-text ${mode === 'Gain' && currentPhase === 'answering' ? 'answer-text' : ''}`}>
                    {currentQuestion.text}
                  </p>
                </div>
              </div>
            )}

            {/* Answer Input */}
            <div className="answer-section">
              <div className="input-container">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={getInputPlaceholder()}
                  className="answer-input"
                  disabled={isLoading || (mode === "Think" && isSatisfied)}
                />
                <button 
                  onClick={sendMessage} 
                  disabled={!input.trim() || isLoading || (mode === "Think" && isSatisfied)}
                  className="send-button"
                >
                  {isLoading ? "..." : "Send"}
                </button>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-row">
                {mode === "Gain" && currentPhase === "questioning" && !isLoading && (
                  <button 
                    onClick={() => setInput("That's all the information I have. Please provide your answer now.")}
                    className="quick-action-btn"
                  >
                    Ready for Answer
                  </button>
                )}

                {mode === "Think" && !isSatisfied && messages.length > 2 && !isLoading && (
                  <button 
                    onClick={() => setInput("I'm satisfied with our exploration. Thank you.")}
                    className="quick-action-btn"
                  >
                    I'm Satisfied
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Previous Answers Summary (Collapsible) */}
        {userAnswers.length > 0 && (
          <div className="answers-summary">
            <details className="summary-toggle">
              <summary>Previous Answers ({userAnswers.length})</summary>
              <div className="answers-list">
                {userAnswers.map((answer, i) => (
                  <div key={i} className="answer-item">
                    <span className="answer-number">{i + 1}.</span>
                    <span className="answer-text">{answer.text}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}   
