const express = require('express');
const router = express.Router();
const rfController = require('../controllers/rfController');

// POST /api/rf-predict
router.post('/', rfController.predictRandomForest);

module.exports = router;
