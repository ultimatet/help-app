import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY,
    {
        auth: {
            // store access & refresh tokens in localStorage
            persistSession: true,
            // schedule a token refresh before expiry
            autoRefreshToken: true,
            // if you’re doing OAuth redirects, this helps pick up the session from the URL
            detectSessionInUrl: true,
        },
    }
);

export default supabase;
