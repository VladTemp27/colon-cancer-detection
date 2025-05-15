const request = require('supertest');
const express = require('express');
const app = require('./index'); // If your app is exported from index.js

// Use a valid 19-feature, one-hot encoded input
const validInput = {
  input: [63, 21.6, 245, 98, 41, 4176, 97, 15.3, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
};

describe('POST /api/predict', () => {
  it('should return a prediction for valid input', async () => {
    const response = await request(app)
      .post('/api/predict')
      .send(validInput)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('prediction');
    expect(typeof response.body.prediction).toBe('number');
  });

  it('should return 500 for invalid input', async () => {
    const invalidInput = { foo: 'bar' };
    const response = await request(app)
      .post('/api/predict')
      .send(invalidInput)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});