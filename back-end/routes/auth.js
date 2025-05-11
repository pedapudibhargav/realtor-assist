const express = require('express');
const router = express.Router();
const { supabase } = require('../utils/supabaseClient');


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

router.post('/email-verify/confirm', async (req, res) => { 
  console.log('email-verify/confirm:', req.body);
  const { access_token } = req.body;
  if (!access_token) return res.status(401).json({ error: 'No token provided' });
  const { data, error } = await supabase.auth.getUser(access_token);
  if (error) return res.status(401).json({ error: error.message });

  res.json(data);
});

router.post('/logout', async (req, res) => {
  const authHeader = req.headers.authorization;
  // console.log('authHeader:', authHeader);
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const { error } = await supabase.auth.signOut(authHeader);
  if (error) return res.status(401).json({ error: error.message }); 
  res.json({ message: 'Logged out successfully' }); 
}
);

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Password reset email sent' });
});

router.post('/update-password', async (req, res) => {
  const { access_token, new_password } = req.body;
  const { data, error } = await supabase.auth.updateUser({ password: new_password }, { access_token });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Password updated successfully' });
});


// create a new anonymous user, set is_anonymous to true. Check if the user already exists in the database.
router.post('/people', async (req, res) => {
  const { email, name, brokerage_id } = req.body;
  // add data validation to make sure email and name are not empty
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: 'No access token found' });
  }
  

 // raw_user_meta_data (jsonb) is used to store additional user data
  // {
//   "sub": "e4b13c5b-6dfe-43fb-a393-3de2aefdf4b2",
//   "email": "pedapudibhargav@gmail.com",
//   "lastname": "TestLast",
//   "firstname": "Bhargav",
//   "email_verified": true,
//   "phone_verified": false
// }
  
  // return anonyUser with 200 response
  res.status(200).json({ message: 'Anonymous user created successfully', user: anonyUser });
});
module.exports = router;
