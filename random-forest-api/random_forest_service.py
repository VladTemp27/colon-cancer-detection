import os
import onnxruntime as ort
import numpy as np

class RandomForestModel:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(__file__), 'model', 'rf_model.onnx')
        self.session = None
        self.input_name = None
        self.input_shape = None
        self.input_type = None

    def load(self):
        if not os.path.exists(self.model_path):
            raise RuntimeError(f"Model file not found at {self.model_path}")
        self.session = ort.InferenceSession(self.model_path)
        input_info = self.session.get_inputs()[0]
        self.input_name = input_info.name
        self.input_shape = input_info.shape
        self.input_type = input_info.type

    def is_loaded(self):
        return self.session is not None

    def info(self):
        return {
            "input_name": self.input_name,
            "input_shape": self.input_shape,
            "input_type": self.input_type,
            "model_loaded": self.is_loaded()
        }

    def predict(self, input_list):
        if not self.is_loaded():
            raise RuntimeError("Model not loaded")
        arr = np.array(input_list, dtype=np.float32).reshape(1, -1)
        result = self.session.run(None, {self.input_name: arr})
        output = result[0]
        if isinstance(output, np.ndarray) and output.size == 1:
            val = output.item()
            if isinstance(val, (np.integer, int)):
                return int(val)
            return float(val)
        return output.tolist()
