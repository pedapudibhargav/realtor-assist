const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.DB_PROJECT_URL;
const supabaseKey = process.env.DB_PROJECT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be set in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
