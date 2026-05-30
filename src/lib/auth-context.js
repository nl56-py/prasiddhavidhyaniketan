'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext({
  user: null,
  session: null,
  adminProfile: null,
  isAdmin: false,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch admin profile using RPC (bypasses RLS)
  const fetchAdminProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc('get_my_admin_profile');

      if (error || !data) {
        setAdminProfile(null);
        setIsAdmin(false);
        return null;
      }

      setAdminProfile(data);
      setIsAdmin(true);
      return data;
    } catch {
      setAdminProfile(null);
      setIsAdmin(false);
      return null;
    }
  }, []);

  // Clear auth state
  const clearAuth = useCallback(() => {
    setUser(null);
    setSession(null);
    setAdminProfile(null);
    setIsAdmin(false);
  }, []);

  // Initialize auth on mount
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          await fetchAdminProfile();
        } else {
          clearAuth();
        }
      } catch {
        if (mounted) clearAuth();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && newSession?.user) {
          setSession(newSession);
          setUser(newSession.user);
          await fetchAdminProfile();
        } else if (event === 'SIGNED_OUT') {
          clearAuth();
        } else if (event === 'TOKEN_REFRESHED' && newSession?.user) {
          setSession(newSession);
          setUser(newSession.user);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchAdminProfile, clearAuth]);

  // Sign in with email and password
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // After successful Supabase auth, verify admin status
    if (data?.user) {
      const profile = await fetchAdminProfile();
      if (!profile) {
        // User authenticated but not an admin — sign them out
        await supabase.auth.signOut();
        throw new Error('You do not have admin access. Contact the super admin.');
      }
    }

    return data;
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    clearAuth();
  };

  const value = {
    user,
    session,
    adminProfile,
    isAdmin,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
