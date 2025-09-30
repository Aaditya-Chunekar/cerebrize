# Cerebrize

Cerebrize is an AI-powered platform designed to foster **holistic human development** by combining intellectual growth, creative thinking, and physical wellness tracking. It provides two interactive modes – **Think** and **Gain** – to help users enhance their cognitive abilities and track physical performance with Strava integration.

---

## Features

### 1. Conversational AI (Think & Gain Modes)
- **Gain Mode**:  
  - Ask clarifying questions first.  
  - Collect essential details and then provide comprehensive answers.  
  - Phase-based interaction: `questioning` → `answering`.  

- **Think Mode**:  
  - Ask thought-provoking questions to encourage deep thinking.  
  - Helps users explore assumptions, alternatives, and perspectives.  
  - Session continues until the user indicates satisfaction.  

- **Session Management**:  
  - Supports multiple concurrent sessions with unique `session_id`.  
  - Tracks conversation history for context-aware responses.

### 2. Physical Betterment
- Integration with Strava (simulated in demo) for fitness tracking.  
- Monitors activities such as running, cycling, and strength training.  
- Tracks metrics like distance, duration, calories burned, weekly goals, and personal bests.  
- Computes a holistic **Betterment Score** combining physical performance.

### 3. Dashboard
- Visualizes intellectual and physical development metrics.  
- Tracks weekly progress with charts.  
- Highlights achievements and milestones.  
- Displays holistic development score combining mind + body performance.

### 4. Frontend
- Built with **React** and **Tailwind CSS**.  
- Components:
  - `Home` – Landing page with mode selection and navigation.  
  - `Chat` – Conversational interface for Think & Gain modes.  
  - `Physical` – Physical activity tracker and stats.  
  - `Dashboard` – Summary of intellectual and physical progress.  

- Features dynamic messaging, session handling, and interactive UI.

### 5. Backend
- Built with **FastAPI**.  
- REST API endpoint: `/chat` handles chat interactions.  
- Uses Google Gemini API for AI-generated responses.  
- Stores session data in-memory (can be replaced with Redis or a database for production).  
- Includes **CORS support** for frontend-backend communication.  

---

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+ / npm or yarn
- Strava account (for physical tracking integration)
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cerebrize
```

2. Backend setup:
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your GEMINI_API_KEY in .env
uvicorn main:app --reload
```

3. Frontend setup:
```bash
cd ../src
npm install
npm run dev
```

4. Open in browser:
```
http://localhost:5173
```

---

## API

### POST `/chat`
Handles Think & Gain mode conversations.

**Request Body**
```json
{
  "message": "Your question or response",
  "mode": "Gain" | "Think",
  "session_id": "optional session id",
  "conversation_history": [
    { "sender": "user" | "bot", "text": "previous message" }
  ]
}
```

**Response**
```json
{
  "reply": "AI-generated response",
  "session_id": "session identifier",
  "phase": "questioning" | "answering",
  "satisfied": true | false
}
```

---

## Project Structure

```
cerebrize/
├─ backend/
│  ├─ main.py          # FastAPI backend
│  └─ requirements.txt
├─ src/
│  ├─ App.jsx          # React main app with router
│  ├─ components/
│  │  ├─ Chat.jsx      # Chat interface
│  │  ├─ Physical.jsx  # Physical activity tracking
│  │  ├─ Dashboard.jsx # Holistic dashboard
│  │  └─ TipTapTest.jsx# Rich text editor component (optional)
│  └─ assets/          # Icons and images
├─ .env                # Environment variables
└─ README.md
```

---

## UI/UX Highlights
- Responsive and interactive interface.  
- Mode toggle (Think/Gain) directly in chat header.  
- Quick action buttons for user convenience (`Ready for Answer`, `I'm Satisfied`).  
- Visual feedback for session completion.  
- Progress and achievements dashboard with gradient charts.  

---

## Future Enhancements
- Real Strava API integration for live fitness data.  
- Persistent session storage with Redis or a database.  
- User authentication and personalized dashboards.  
- Expand AI capabilities with fine-tuned prompts for physical, intellectual, and creative development.

---

## License
This project is open-source and available under the MIT L
