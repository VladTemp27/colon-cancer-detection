const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const environment = process.env.NODE_ENV || 'development';
const envFile = environment === 'production' ? '.env' : '.env.development';

dotenv.config({path: `./${envFile}`});

const PORT = process.env.PORT || 2019;

// Middleware
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
