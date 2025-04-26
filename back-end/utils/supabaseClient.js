const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.DB_PROJECT_URL;
const supabaseKey = process.env.DB_PROJECT_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be set in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing connection to:', supabaseUrl);
  console.log('Attempting to select from public.transaction...');

  // Use .from('transaction') or .from('brokerage')
  const { data, error } = await supabase.from('transaction').select('*').limit(1);

  if (error) {
      console.error('Test Query Error:', error);
  } else {
      console.log('Test Query Success. Data:', data);
  }
}

async function validateToken(authToken) {
  console.log('Testing authentication with token:', authToken);
  const { data, error } = await supabase.auth.getUser(authToken);
  if (error) {
      console.error('Auth Test Error:', error);
  } else {
      // console.log('Auth Test Success. User:', data);
  }
  return data;
}

async function validateTokenFromReq(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      console.error('No token provided');
      return null;
  }
  const token = authHeader;
  return validateToken(token);
}


testConnection();
// export testAuth function for testing
module.exports = {supabase, validateToken, validateTokenFromReq};
