const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config({path: './config/.env'});

const app = express();

const PORT = process.env.PORT || 5000;
//const environment = process.env.NODE_ENV || 'development';
const environment = 'production';

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Routes
app.use(express.json());
app.use('/api/message', require('./routes/message'));

// Serving content
if (environment === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.use((req, res, next) => {
    res.send('Welcome to Express');
  });
}

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});