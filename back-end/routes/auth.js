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
router.post('/anonymous', async (req, res) => {
  const { email, name, brokerage_id } = req.body;
  // add data validation to make sure email and name are not empty
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: 'No access token found' });
  }
  // get the user from the auth token
  const { data: user, error: userError } = await supabase.auth.getUser(authToken);
  if (userError) {
    console.error('Error fetching user:', userError);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = user.user.id;

  // check if the user already exists in the database with email
  const { data: existingUser, error: existingUserError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  if (existingUserError) {
    console.error('Error fetching existing user:', existingUserError);
    return res.status(500).json({ error: 'Internal server error' });
  }
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  // check if the user has access to the brokerage
  const { data: brokerageUserRole, error: brokerageUserRoleError } = await supabase
    .from('brokerage_user_roles')
    .select('roles, user_id, brokerage_id')
    .eq('user_id', userId)
    .eq('brokerage_id', brokerage_id).single();
  if (brokerageUserRoleError) {
    console.error('Error fetching brokerage user role:', brokerageUserRoleError);
    return res.status(500).json({ error: 'Internal server error' });
  }
  if (!brokerageUserRole || brokerageUserRole.length === 0) {
    return res.status(403).json({ error: 'User does not have access to this brokerage' });
  }

  
  const { data: anonyUser, error: anonyUserCreationError } = await supabase
    .from('users')
    .insert(
      { email: email, name: name, is_anonymous: true, role: 'not_activated' })
    .select();
  if (anonyUserCreationError) {
    console.error('Error creating anonymous');
    return res.status(500).json({ error: 'Failed to create new person' });
  }
  // return anonyUser with 200 response
  res.status(200).json({ message: 'Anonymous user created successfully', user: anonyUser });
});
module.exports = router;
