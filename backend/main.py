from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import os
from utils.preprocess import preprocess_image
from tensorflow.keras.models import load_model
from utils.random_forest_service import RandomForestModel
from io import BytesIO
from PIL import Image

app = FastAPI()

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'binary_classifier_refined_class_weights_v5.keras')
rf_model = RandomForestModel()
keras_model = None

class PredictRequest(BaseModel):
    input: list

class PredictResponse(BaseModel):
    prediction: float | int

@app.on_event("startup")
def load_models():
    global keras_model
    rf_model.load()
    keras_model = load_model(MODEL_PATH)

# --- Random Forest Section ---     
@app.get("/model-info")
def model_info():
    if not rf_model.is_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")
    return rf_model.info()

@app.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    if not rf_model.is_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")
    prediction = rf_model.predict(request.input)
    return {"prediction": prediction}

# --- Image Classifier Section ---
@app.post("/classify")
async def keras_predict(file: UploadFile = File(...)):
    if keras_model is None:
        raise HTTPException(status_code=503, detail="Keras model not loaded")
    try:
        file.file.seek(0)
        img_bytes = file.file.read()
        pil_img = Image.open(BytesIO(img_bytes)).convert('RGB')
        img = preprocess_image(pil_img)
        preds = keras_model.predict(img)
        pred_class = int(np.argmax(preds, axis=1)[0])
        confidence = float(np.max(preds))
        return {"class": pred_class, "confidence": confidence}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image processing error: {str(e)}")
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
