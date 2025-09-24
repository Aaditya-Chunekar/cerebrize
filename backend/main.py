from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from typing import List, Dict, Optional
import uuid

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()  # Load environment variables from .env file
# Configure Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class ChatMessage(BaseModel):
    sender: str  # "user" or "bot"
    text: str

class ChatRequest(BaseModel):
    message: str
    mode: str  # "Gain" or "Think"
    session_id: Optional[str] = None
    conversation_history: List[ChatMessage] = []

# In-memory session storage (in production, use Redis or database)
sessions: Dict[str, Dict] = {}

def get_message_text(msg) -> tuple[str, str]:
    """Helper function to extract sender and text from message (handles both dict and Pydantic model)"""
    if isinstance(msg, dict):
        return msg["sender"], msg["text"]
    else:
        return msg.sender, msg.text

@app.post("/chat")
async def chat(req: ChatRequest):
    # Generate session ID if not provided
    session_id = req.session_id or str(uuid.uuid4())
    
    # Initialize session if new
    if session_id not in sessions:
        sessions[session_id] = {
            "mode": req.mode,
            "conversation_history": [],
            "gain_phase": "questioning",  # "questioning" or "answering"
            "think_satisfied": False,
            "questions_asked": 0
        }
    
    session = sessions[session_id]
    session["conversation_history"].extend(req.conversation_history)
    
    # Add current user message
    session["conversation_history"].append({"sender": "user", "text": req.message})
    
    if req.mode == "Gain":
        response_text = await handle_gain_mode(req.message, session)
    else:  # Think mode
        response_text = await handle_think_mode(req.message, session)
    
    # Add bot response to history
    session["conversation_history"].append({"sender": "bot", "text": response_text})
    
    return {
        "reply": response_text,
        "session_id": session_id,
        "phase": session.get("gain_phase", "thinking"),
        "satisfied": session.get("think_satisfied", False)
    }

async def handle_gain_mode(user_message: str, session: Dict) -> str:
    """Handle Gain mode: Ask questions first, then provide comprehensive answer"""
    
    # If user completed a Gain session and is asking a new question, reset the session
    if session.get("gain_phase") == "answering" and len(user_message.strip()) > 15:
        # Check if it's a new topic/question (not just a follow-up)
        question_phrases = ["what", "how", "why", "can", "should", "would", "could", "tell me", "help me", "explain"]
        if any(phrase in user_message.lower() for phrase in question_phrases):
            session["gain_phase"] = "questioning"
    
    # Check if user is indicating they're done with questions
    done_indicators = ["that's all", "no more", "ready for answer", "give me the answer", 
                      "answer now", "i'm done", "proceed", "continue", "go ahead"]
    
    if any(indicator in user_message.lower() for indicator in done_indicators):
        session["gain_phase"] = "answering"
    
    conversation_context = "\n".join([
        f"{sender}: {text}" for sender, text in [get_message_text(msg) for msg in session["conversation_history"]]
    ])
    
    if session["gain_phase"] == "questioning":
        system_prompt = f"""
        You are Cerebrize in Gain mode - QUESTIONING PHASE.
        
        Your role:
        1. Ask ONE short, specific clarifying question to understand the user's request better
        2. Focus on reducing ambiguity and gathering essential details YOU need
        3. Ask about context, constraints, goals, or specific requirements
        4. Keep questions VERY SHORT - maximum 1-2 sentences
        5. If you have enough information after a few exchanges, you can proceed to answer
        
        IMPORTANT: Your question must be SHORT and DIRECT. No long explanations.
        
        Conversation so far:
        {conversation_context}
        
        Current user message: {user_message}
        
        Ask ONE short clarifying question now (1-2 sentences max). If you have sufficient information, say "I have enough information to help you" and proceed with the answer.
        """
    else:  # answering phase
        system_prompt = f"""
        You are Cerebrize in Gain mode - ANSWERING PHASE.
        
        Based on all the information gathered, provide a comprehensive, detailed answer.
        
        Conversation history:
        {conversation_context}
        
        Provide your complete solution/answer now. Be thorough and actionable.
        """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=[system_prompt]
    )
    
    return response.text

async def handle_think_mode(user_message: str, session: Dict) -> str:
    """Handle Think mode: Ask thought-provoking questions until user is satisfied"""
    
    # Check if user indicates they're satisfied
    satisfied_indicators = ["satisfied", "enough", "clear now", "understand now", 
                          "thank you", "that helps", "got it", "makes sense",
                          "i'm good", "that's helpful", "no more questions"]
    
    if any(indicator in user_message.lower() for indicator in satisfied_indicators):
        session["think_satisfied"] = True
        return "Great! I'm glad I could help you think through this. Feel free to ask a new question to start another thinking session, or start a new conversation to explore a different topic."
    
    # If user was satisfied but is asking a new substantial question, restart the think session
    if session.get("think_satisfied", False) and len(user_message.strip()) > 15:
        # Check if it's not just a continuation response but a new topic/question
        continuation_phrases = ["what", "how", "why", "can", "should", "would", "could", "tell me", "help me"]
        if any(phrase in user_message.lower() for phrase in continuation_phrases):
            # Reset think session for new topic
            session["think_satisfied"] = False
            session["questions_asked"] = 0
    
    conversation_context = "\n".join([
        f"{sender}: {text}" for sender, text in [get_message_text(msg) for msg in session["conversation_history"]]
    ])
    
    # Only increment if we're actively in a thinking session
    if not session.get("think_satisfied", False):
        session["questions_asked"] = session.get("questions_asked", 0) + 1
    
    if session["think_satisfied"]:
        return "I'm here when you're ready to explore something new! What would you like to think about?"
    
    system_prompt = f"""
    You are Cerebrize in Think mode.
    
    Your role:
    1. Ask ONE short, thought-provoking question to help the user think deeper
    2. Encourage exploration of assumptions, alternatives, and different perspectives
    3. Help them discover insights on their own
    4. Ask about underlying motivations, potential consequences, or different angles
    5. Be a thinking partner, not an answer provider
    
    IMPORTANT: Your question must be SHORT and DIRECT. Maximum 1-2 sentences.
    
    Questions asked so far: {session['questions_asked']}
    
    Conversation history:
    {conversation_context}
    
    Current user message: {user_message}
    
    Ask ONE short, thought-provoking question (1-2 sentences max) that will help them think deeper about their situation. 
    Focus on helping them discover their own insights.
    """
    
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=[system_prompt]
    )
    
    return response.text
