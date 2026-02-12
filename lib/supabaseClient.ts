import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvfzuoboyolkqhurxmhp.supabase.co';
const supabaseKey = 'sb_publishable__ntM37aDJbZMbYlzmuhy6w_XXWN4Lk9';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseConfigured = () => {
    return true;
};