'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setMessages(data || []);
  };

  const markRead = async (id) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    loadMessages();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      await supabase.from('contact_messages').delete().eq('id', id);
      loadMessages();
      setSelected(null);
    }
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.is_read) markRead(msg.id);
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Contact Messages</h1>
        <span className="badge badge--info">{messages.filter(m => !m.is_read).length} Unread</span>
      </div>

      <div className="admin-table">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {messages.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>No messages yet.</td></tr>
            ) : messages.map(msg => (
              <tr key={msg.id} style={{ fontWeight: msg.is_read ? 400 : 600 }}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.subject}</td>
                <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                <td><span className={`badge badge--${msg.is_read ? 'success' : 'info'}`}>{msg.is_read ? 'Read' : 'New'}</span></td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn admin-btn--edit" onClick={() => openMessage(msg)}>View</button>
                    <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(msg.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">Message Details</h2>
              <button className="admin-modal__close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              {[
                ['Name', selected.name],
                ['Email', selected.email || 'N/A'],
                ['Phone', selected.phone || 'N/A'],
                ['Subject', selected.subject || 'N/A'],
                ['Date', new Date(selected.created_at).toLocaleString()],
              ].map(([label, value], i) => (
                <div key={i}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontWeight: 500 }}>{value}</div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Message</div>
                <div style={{ background: 'var(--color-surface-alt)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', marginTop: 'var(--space-2)', lineHeight: 'var(--leading-relaxed)' }}>{selected.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
