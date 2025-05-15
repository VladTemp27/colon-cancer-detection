from fastapi import FastAPI, UploadFile, File
from utils.preprocess import preprocess_image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = FastAPI()

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'binary_classifier_refined_v5.keras')
model = load_model(MODEL_PATH)

@app.get("/")
def root():
    return {"message": "Keras Image Classifier API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img = preprocess_image(file.file)
    # macenko normalization 

    preds = model.predict(img)
    pred_class = int(np.argmax(preds, axis=1)[0])
    confidence = float(np.max(preds))
    return {"class": pred_class, "confidence": confidence}
