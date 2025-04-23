
const createClient = require('@supabase/supabase-js').createClient;
const dotenv = require("dotenv");
dotenv.config();
const supabase = createClient(process.env.DB_PROJECT_URL, process.env.DB_PROJECT_KEY);
module.exports = supabase;