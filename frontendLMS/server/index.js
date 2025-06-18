const express = require('express');
const cors = require('cors');
const app = express();


// ✅ Add this
app.use(cors({
  origin: 'http://localhost:3000', // your frontend's origin
  credentials: true                // allow cookies, tokens, etc.
}));

// Other middleware
app.use(express.json());

// Your routes here
app.use('/api/auth', require('./routes/auth')); // example

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));


