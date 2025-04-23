const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');


// Define product-related routes
router.get('/', (req, res) => {
  res.send('Working');
});

router.post('/', (req, res) => {
  res.send('Create a new product');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('login:', email, password);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password, firstname, lastname, role } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstname,
        lastname,
        role
      }
    }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ user: data.user });
});


router.get('/user', async (req, res) => {  
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const { data, error } = await supabase.auth.getUser(authHeader);
  if (error) return res.status(401).json({ error: error.message });

  res.json({ user: data.user });
});

module.exports = router;
