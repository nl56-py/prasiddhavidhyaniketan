'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  // If already logged in as admin, redirect to dashboard
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      router.push('/admin');
    }
  }, [user, isAdmin, authLoading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  // Don't show login form if already authenticated
  if (authLoading) {
    return (
      <div className="admin-login">
        <div style={{ color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="admin-spinner" />
          Checking authentication...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <img src="/logo.png" alt="PVN" style={{ width: 64, height: 64, margin: '0 auto var(--space-4)' }} />
          <h1 className="admin-login__title">Admin Panel</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Prasiddha Vidhya Niketan</p>
        </div>

        {error && <div className="form-message form-message--error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@pvn.edu.np" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn--primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
