/**
 * Supabase Client Configuration
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

// Standard client (subject to RLS)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client (bypasses RLS)
// Only initialized if SERVICE_ROLE_KEY is provided
export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;
