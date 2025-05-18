const express = require('express');
const path = require('path');
const Calculator = require('./calculator');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON request body
app.use(express.json());

// Calculator API endpoints
app.post('/api/calculate', (req, res) => {
  try {
    const { operation, a, b } = req.body;
    const calculator = new Calculator();
    let result;

    switch (operation) {
      case 'add':
        result = calculator.add(Number(a), Number(b));
        break;
      case 'subtract':
        result = calculator.subtract(Number(a), Number(b));
        break;
      case 'multiply':
        result = calculator.multiply(Number(a), Number(b));
        break;
      case 'divide':
        result = calculator.divide(Number(a), Number(b));
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check endpoint for Jenkins
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Service is running' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app; // Export for testing