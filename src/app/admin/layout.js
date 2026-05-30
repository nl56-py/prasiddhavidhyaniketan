'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/notices', label: 'Notices', icon: '📢' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/blog', label: 'Blog', icon: '📝' },
  { href: '/admin/admissions', label: 'Admissions', icon: '🎓' },
  { href: '/admin/messages', label: 'Messages', icon: '✉️' },
];

export default function AdminLayout({ children }) {
  const { user, adminProfile, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect while still loading
    if (loading) return;

    // Skip redirect for login page
    if (pathname === '/admin/login') return;

    // Redirect to login if not authenticated or not an admin
    if (!user || !isAdmin) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, loading, pathname, router]);

  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };

  // Login page gets no sidebar/chrome
  if (pathname === '/admin/login') return <>{children}</>;

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="admin-login">
        <div style={{ color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="admin-spinner" />
          Loading...
        </div>
      </div>
    );
  }

  // Don't render admin content if not authorized
  if (!user || !isAdmin) return null;

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
          {/* Admin profile info */}
          {adminProfile && (
            <div style={{
              padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              marginBottom: 'var(--space-2)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(255,255,255,0.6)',
            }}>
              <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '2px' }}>
                {adminProfile.display_name || adminProfile.email}
              </div>
              <div style={{ textTransform: 'capitalize' }}>
                {adminProfile.role?.replace('_', ' ')}
              </div>
            </div>
          )}

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
