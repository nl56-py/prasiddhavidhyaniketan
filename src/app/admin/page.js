'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ notices: 0, gallery: 0, blog: 0, admissions: 0, messages: 0 });
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [notices, gallery, blog, admissions, messages] = await Promise.all([
        supabase.from('notices').select('id', { count: 'exact', head: true }),
        supabase.from('gallery').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('admissions').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        notices: notices.count || 0,
        gallery: gallery.count || 0,
        blog: blog.count || 0,
        admissions: admissions.count || admissions.data?.length || 0,
        messages: messages.count || messages.data?.length || 0,
      });
      setRecentAdmissions(admissions.data || []);
      setRecentMessages(messages.data || []);
    } catch (err) {
      console.error('Dashboard load error:', err);
    }
  };

  const statCards = [
    { icon: '📢', label: 'Notices', value: stats.notices, color: '#1a237e' },
    { icon: '🖼️', label: 'Gallery Images', value: stats.gallery, color: '#00695c' },
    { icon: '📝', label: 'Blog Posts', value: stats.blog, color: '#ef6c00' },
    { icon: '🎓', label: 'Admissions', value: stats.admissions, color: '#c62828' },
    { icon: '✉️', label: 'Messages', value: stats.messages, color: '#1565c0' },
  ];

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Dashboard</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Welcome to PVN Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        {statCards.map((card, i) => (
          <div className="admin-stat-card" key={i}>
            <div className="admin-stat-card__icon">{card.icon}</div>
            <div className="admin-stat-card__value">{card.value}</div>
            <div className="admin-stat-card__label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Admissions */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>Recent Admission Applications</h2>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Parent Name</th>
                <th>Class</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAdmissions.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>No applications yet. Connect Supabase to see data.</td></tr>
              ) : recentAdmissions.map((app, i) => (
                <tr key={i}>
                  <td>{app.student_name}</td>
                  <td>{app.parent_name}</td>
                  <td>{app.class_applied}</td>
                  <td>{app.phone}</td>
                  <td><span className={`badge badge--${app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'error' : 'warning'}`}>{app.status || 'Pending'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>Recent Contact Messages</h2>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>No messages yet. Connect Supabase to see data.</td></tr>
              ) : recentMessages.map((msg, i) => (
                <tr key={i}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td><span className={`badge badge--${msg.is_read ? 'success' : 'info'}`}>{msg.is_read ? 'Read' : 'New'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
