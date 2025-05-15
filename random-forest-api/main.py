from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from random_forest_service import RandomForestModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Initialize the RandomForestModel
rf_model = RandomForestModel()

class PredictRequest(BaseModel):
    input: list

class PredictResponse(BaseModel):
    prediction: float | int

@app.on_event("startup")
def load_model():
    rf_model.load()

@app.get("/model-info")
def model_info():
    if not rf_model.is_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")
    return rf_model.info()

@app.post("/rf-predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    if not rf_model.is_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")
    prediction = rf_model.predict(request.input)
    return {"prediction": prediction}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
