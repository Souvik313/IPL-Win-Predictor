from fastapi import FastAPI
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from app.schemas import MatchInput
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="IPL Win Predictor")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "ipl_win_predictor.pkl"

model = joblib.load(MODEL_PATH)

@app.get("/")
def home():
    return {"message": "IPL Win Predictor API is running"}

@app.post("/predict")
def predict(data: MatchInput):

    features = pd.DataFrame([data.model_dump()])

    prob = model.predict_proba(features)[0][1]

    return {
        "win_probability": round(float(prob), 4)
    }