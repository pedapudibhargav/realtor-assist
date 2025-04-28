const express = require('express');
const { supabase, validateTokenFromReq, IsValidBrokerageUser, GetSupabaseClientWithAuth } = require('../utils/supabaseClient');
const router = express.Router();


router.get('/', async (req, res) => {
    console.log('---- Fetching all transactions:');
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'Missing authorization token' });
        }

        const brokerageId = req.query.brokerage_id;
        if (!brokerageId) {
            return res.status(400).json({ error: 'Missing brokerage_id in request query' });
        }

        const supabaseClientWithAuth = GetSupabaseClientWithAuth(authToken);

        // Fetch all transactions for the brokerage (RLS will handle access control)
        const { data: transactions, error: transactionError } = await supabaseClientWithAuth
            .from('transactions')
            .select('*')
            .eq('brokerage_id', brokerageId);

        if (transactionError) {
            console.error('Error fetching transactions:', transactionError);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the user', error:transactionError });
        }
        console.log('Transactions fetched successfully count:', transactions.length);
        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});


router.post('/', async (req, res) => {
    console.log('---- Creating a new transaction:');
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'Missing authorization token' });
        }

        const { transaction_name, transaction_type, brokerage_id } = req.body;

        if (!transaction_name) {
            return res.status(400).json({ error: 'Missing transaction_name in request body' });
        }
        if (!brokerage_id) {
            return res.status(400).json({ error: 'Missing brokerage_id in request body' });
        }
        if (!transaction_type) {
            return res.status(400).json({ error: 'Missing transaction_type in request body' });
        }

        const supabaseClientWithAuth = GetSupabaseClientWithAuth(authToken);

        // Create a new transaction (RLS will handle access control)
        const { data: transaction, error: transactionError } = await supabaseClientWithAuth
            .from('transactions')
            .insert({ name: transaction_name, brokerage_id, transaction_type })
            .select();

        if (transactionError) {
            console.error('Error creating transaction:', transactionError);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Transaction created successfully:', transaction[0]);
        return res.status(201).json({ message: 'Transaction created successfully', transaction: transaction[0] });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});



// get transaction by id
router.get('/:transactionId', async (req, res) => {    
    const transactionId = req.params.transactionId;
    if (!transactionId) {
        return res.status(400).json({ error: 'Missing transactionId in request params' });
    }

    const authToken = req.headers.authorization;    
    if (!authToken) {
        return res.status(401).json({ error: 'Missing authorization token' });
    }

    const supabaseClientWithAuth = GetSupabaseClientWithAuth(authToken);

    // Fetch transaction by id (RLS will handle access control)
    const { data: transaction, error: transactionError } = await supabaseClientWithAuth
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();

    if (transactionError) {
        console.error('Error fetching transaction:', transactionError);
        return res.status(500).json({ error: 'Internal server error' });
    }
    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
    }
    console.log('Transaction fetched successfully:', transaction);
    return res.status(200).json(transaction);
});

// update transaction by id
router.put('/:transactionId', async (req, res) => {
    console.log('---- Updating transaction:');
    try {
        const transactionId = req.params.transactionId;
        if (!transactionId) {
            return res.status(400).json({ error: 'Missing transactionId in request params' });
        }

        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'Missing authorization token' });
        }

        const { brokerage_id, ...updateFields } = req.body;
        if (!brokerage_id) {
            return res.status(400).json({ error: 'Missing brokerage_id in request body' });
        }

        const supabaseClientWithAuth = GetSupabaseClientWithAuth(authToken);

        // Update transaction by id (RLS will handle access control)
        const { data: transaction, error: transactionError } = await supabaseClientWithAuth
            .from('transactions')
            .update(updateFields)
            .eq('id', transactionId)
            .eq('brokerage_id', brokerage_id)
            .select();

        if (transactionError) {
            console.error('Error updating transaction:', transactionError);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!transaction || transaction.length === 0) {
            return res.status(404).json({ message: 'Transaction not found or unauthorized' });
        }

        console.log('Transaction updated successfully:', transaction[0]);
        return res.status(200).json({ message: 'Transaction updated successfully', transaction: transaction[0] });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});
module.exports = router;