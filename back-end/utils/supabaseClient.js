const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.DB_PROJECT_URL;
const supabaseKey = process.env.DB_PROJECT_KEY;

// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase Key:', supabaseKey);
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
  console.log('Testing authentication with token Length=  ', authToken.length);
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

async function IsValidBrokerageUser(brokerageId, userId) {
  // check in brokerage_user_roles table with user_id and brokerage_id
  const { data, error } = await supabase
      .from('brokerage_user_roles')
      .select('roles, user_id, brokerage_id')
      .eq('user_id', userId)
      .eq('brokerage_id', brokerageId);
  if (error) {
      console.error('Error fetching brokerage user role:', error);
      return false;
  }
  if (!data || data.length === 0) {
      console.error('No brokerage user role found for user:', userId, 'and brokerage:', brokerageId);
      return false;
  }
  return data[0].roles;
}


GetSupabaseClientWithAuth = (accessToken) => {
  if (!supabaseUrl || !supabaseKey) {
    console.error('SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables are not set.');
    throw new Error('Supabase configuration missing.');
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  return supabase;
};

testConnection();
// export testAuth function for testing
module.exports = {supabase, GetSupabaseClientWithAuth, validateToken, validateTokenFromReq, IsValidBrokerageUser};
