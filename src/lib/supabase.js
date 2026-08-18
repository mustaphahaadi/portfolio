import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  "";

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("your-project-id")
);

// Fallback dummy values to prevent runtime crashes if env variables are missing
const validUrl = isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co";
const validKey = isSupabaseConfigured ? supabaseAnonKey : "placeholder-key";

export const supabase = createClient(validUrl, validKey);
