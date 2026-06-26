import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback checks to prevent app crashes if keys are missing
export const isSupabaseConfigured = supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_PROJECT_URL' && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

// Generate or retrieve a unique tab ID from the URL to isolate storage keys
export let tabId = '';
if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  let tid = params.get('tid');
  if (!tid) {
    tid = 'tab-' + Math.random().toString(36).substring(2, 11);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tid', tid);
    window.history.replaceState({}, '', newUrl.toString());
  }
  tabId = tid;
}

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co', 
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder',
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      detectSessionInUrl: true,
      broadcast: false,
      storageKey: tabId ? `sb-auth-token-${tabId}` : undefined
    }
  }
);
