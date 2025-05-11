const express = require('express');
const router = express.Router();

// Middleware to handle URL parameters
router.param('brokerage_id', (req, res, next, brokerage_id) => {
  req.brokerage_id = brokerage_id;
  next();
});

router.param('transaction_id', (req, res, next, transaction_id) => {
  req.transaction_id = transaction_id;
  next();
});

// Define routes for parties
router.get('/:brokerage_id/transactions/:transaction_id/parties', (req, res) => {
  const { brokerage_id, transaction_id } = req.params;
  res.send(`Fetching parties for brokerage ${brokerage_id} and transaction ${transaction_id}`);
});

router.post('/:brokerage_id/transactions/:transaction_id/parties', (req, res) => {
  const { brokerage_id, transaction_id } = req.params;
  res.send(`Creating a party for brokerage ${brokerage_id} and transaction ${transaction_id}`);
});

module.exports = router;
