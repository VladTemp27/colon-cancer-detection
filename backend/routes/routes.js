const express = require('express');
const rfRouter = require('./routes/predict');

module.exports = function(app) {
  // Use the more specific random forest prediction route
  app.use('/api/rf-predict', rfRouter);
};