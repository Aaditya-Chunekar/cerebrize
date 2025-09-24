from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

# Allow frontend (React) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for MVP (restrict later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schema for incoming data
class Metrics(BaseModel):
    typing_speed: float
    pause_duration: float
    revisions: int

# Simple rule-based prompts
prompts = {
    "stuck": [
        "What’s another way you could phrase this?",
        "What’s the main point you want to express?",
    ],
    "flow": [
        "Keep going, you’re in rhythm!",
        "Good pace, stay focused.",
    ],
    "anxious": [
        "It’s okay to draft messily first.",
        "Don’t worry about perfection—just write.",
    ],
}

@app.post("/analyze")
def analyze(metrics: Metrics):
    if metrics.pause_duration > 2:
        return {"prompt": random.choice(prompts["stuck"])}
    elif metrics.revisions > 5:
        return {"prompt": random.choice(prompts["anxious"])}
    else:
        return {"prompt": random.choice(prompts["flow"])}
