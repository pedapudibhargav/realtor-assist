const express = require('express');
const router = express.Router();

// Define product-related routes
router.get('/', (req, res) => {
  res.send('Get all products');
});

router.post('/', (req, res) => {
  res.send('Create a new product');
});

module.exports = router;
