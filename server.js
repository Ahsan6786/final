// Server for handling portfolio messages
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  console.log('Using existing mdessgaes table in portfolio database');
});

// API endpoint to save a message
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message' });
  }
  
  const query = 'INSERT INTO mdessgaes (name, email, message) VALUES (?, ?, ?)';
  
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Message saved successfully',
      id: result.insertId
    });
  });
});

// API endpoint to save chatbot messages
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  
  // Basic validation
  if (!message) {
    return res.status(400).json({ error: 'Please provide a message' });
  }
  
  const query = 'INSERT INTO mdessgaes (name, email, message) VALUES (?, ?, ?)';
  
  db.query(query, ['Chatbot User', 'chatbot@user.com', message], (err, result) => {
    if (err) {
      console.error('Error saving chatbot message:', err);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Chatbot message saved successfully',
      id: result.insertId
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
