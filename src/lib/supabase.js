import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a dummy client if env vars are not set (during build/dev without Supabase)
const isDummy = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url';

let supabase;

if (isDummy) {
  // Create a mock Supabase client that returns empty results
  const noopResponse = { data: null, error: null, count: 0 };
  const noopQuery = () => ({
    select: () => noopQuery(),
    insert: () => Promise.resolve(noopResponse),
    update: () => ({ eq: () => Promise.resolve(noopResponse) }),
    delete: () => ({ eq: () => Promise.resolve(noopResponse) }),
    eq: () => noopQuery(),
    order: () => noopQuery(),
    limit: () => noopQuery(),
    single: () => Promise.resolve(noopResponse),
    then: (cb) => Promise.resolve(noopResponse).then(cb),
  });

  supabase = {
    from: () => noopQuery(),
    rpc: () => Promise.resolve(noopResponse),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({}),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    storage: {
      from: () => ({ upload: () => Promise.resolve(noopResponse), getPublicUrl: () => ({ data: { publicUrl: '' } }) }),
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
export function getSupabaseClient() {
  return supabase;
}
