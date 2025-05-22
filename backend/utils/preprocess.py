import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from io import BytesIO
from PIL import Image

def preprocess_image(img, target_size=(224, 224)):
    # If img is a path, load it
    if isinstance(img, str):
        img = image.load_img(img, target_size=target_size)
    else:
        img = img.resize(target_size)
        
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array