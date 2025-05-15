const ort = require('onnxruntime-node');
const path = require('path');

let session = null;
let inputNames = null;
let inputMetadata = null;
let modelLoaded = false;

// Load the ONNX model at startup
(async () => {
  try {
    session = await ort.InferenceSession.create(
      path.join(__dirname, '../models/rf_model.onnx')
    );
    inputNames = session.inputNames;
    inputMetadata = session.inputMetadata;
    modelLoaded = true;
    console.log('ONNX model loaded');
  } catch (err) {
    console.error('Failed to load ONNX model:', err);
  }
})();

exports.isLoaded = () => modelLoaded;

exports.runInference = async (inputData) => {
  // Accept either {input: [...]} or individual properties
  let inputArray;
  if (Array.isArray(inputData.input)) {
    inputArray = inputData.input.map(Number);
  } else {
    inputArray = [
      Number(inputData.age),
      Number(inputData.bmi),
      Number(inputData.carbohydrates),
      Number(inputData.protein),
      Number(inputData.fats),
      Number(inputData.iron),
      Number(inputData.vitaminA),
      Number(inputData.vitaminC),
      Number(inputData.gender_1),
      Number(inputData.lifestyle_1),
      Number(inputData.lifestyle_2),
      Number(inputData.ethnicity_1),
      Number(inputData.ethnicity_2),
      Number(inputData.familyHistory_1),
      Number(inputData.preExistingCondition_1),
      Number(inputData.preExistingCondition_2),
      Number(inputData.preExistingCondition_3),
      Number(inputData.preExistingCondition_4),
      Number(inputData.preExistingCondition_5),
    ];
  }
  // Detect input type from model metadata
  const inputName = inputNames[0];
  const inputMeta = Array.isArray(inputMetadata)
    ? inputMetadata.find(meta => meta.name === inputName)
    : inputMetadata[inputName];
  if (!inputMeta) {
    throw new Error('Model input metadata not found');
  }
  const inputType = inputMeta.type;
  let tensor;
  if (inputType === 'int64') {
    tensor = new ort.Tensor('int64', BigInt64Array.from(inputArray.map(v => BigInt(Math.round(v)))), [1, inputArray.length]);
  } else {
    tensor = new ort.Tensor('float32', Float32Array.from(inputArray), [1, inputArray.length]);
  }
  const feeds = { [inputName]: tensor };
  const results = await session.run(feeds);
  const output = results[Object.keys(results)[0]];
  // Convert BigInt(s) to Number(s) if needed
  let prediction = output.data;
  if (typeof prediction === 'bigint') {
    prediction = Number(prediction);
  } else if (typeof prediction === 'object' && typeof prediction.length === 'number') {
    prediction = Array.from(prediction);
    if (typeof prediction[0] === 'bigint') {
      prediction = prediction.map(Number);
    }
    if (prediction.length === 1) {
      prediction = prediction[0];
    }
  }
  return prediction;
};
