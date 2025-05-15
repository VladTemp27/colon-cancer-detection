const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './.env.production' });

const app = express();
const PORT = process.env.PORT || 5010;

app.use(cors());
app.use(express.json());
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    })
})


// Use the new, more specific random forest prediction route
const rfRouter = require('./routes/predict');
app.use('/api/rf-predict', rfRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;