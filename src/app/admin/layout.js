'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/notices', label: 'Notices', icon: '📢' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/blog', label: 'Blog', icon: '📝' },
  { href: '/admin/admissions', label: 'Admissions', icon: '🎓' },
  { href: '/admin/messages', label: 'Messages', icon: '✉️' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else {
        setUser(session?.user || null);
      }
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') router.push('/admin/login');
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;
  if (loading) return <div className="admin-login"><div style={{ color: 'white', fontSize: '1.5rem' }}>Loading...</div></div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <img src="/logo.png" alt="PVN" />
          <span className="admin-sidebar__logo-text">PVN Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          {sidebarLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-sidebar__link ${pathname === link.href ? 'admin-sidebar__link--active' : ''}`}
            >
              <span className="icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Link href="/" className="admin-sidebar__link" target="_blank">
            <span className="icon">🌐</span>
            <span>View Site</span>
          </Link>
          <button className="admin-sidebar__link" onClick={handleLogout}>
            <span className="icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
