const modelService = require('../services/modelService');

exports.predictRandomForest = async (req, res) => {
  try {
    // Ensure model is loaded
    if (!modelService.isLoaded()) {
      return res.status(503).json({ error: 'Random Forest model not loaded yet' });
    }
    const inputData = req.body;
    const prediction = await modelService.runInference(inputData);
    res.json({ prediction });
  } catch (err) {
    console.error('Random Forest prediction error:', err);
    console.error(err?.stack);
    res.status(500).json({ error: 'Random Forest prediction failed' });
  }
};
