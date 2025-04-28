const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true // Allow cookies and credentials
}));

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const auth = require('./routes/auth');
const brokerage = require('./routes/brokerage_api');
const transactions = require('./routes/transactions_api');

// Use routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/api/auth', auth);
app.use('/api/brokerages', brokerage);
app.use('/api/transactions', transactions);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});