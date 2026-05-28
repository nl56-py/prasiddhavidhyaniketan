'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title_en: '', title_np: '', content_en: '', content_np: '', is_published: true });

  useEffect(() => { loadNotices(); }, []);

  const loadNotices = async () => {
    const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
    setNotices(data || []);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editItem) {
      await supabase.from('notices').update(form).eq('id', editItem.id);
    } else {
      await supabase.from('notices').insert([form]);
    }
    setShowModal(false);
    setEditItem(null);
    setForm({ title_en: '', title_np: '', content_en: '', content_np: '', is_published: true });
    loadNotices();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm({ title_en: item.title_en, title_np: item.title_np, content_en: item.content_en, content_np: item.content_np, is_published: item.is_published });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      await supabase.from('notices').delete().eq('id', id);
      loadNotices();
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Notices</h1>
        <button className="btn btn--primary btn--sm" onClick={() => { setEditItem(null); setForm({ title_en: '', title_np: '', content_en: '', content_np: '', is_published: true }); setShowModal(true); }}>
          + Add Notice
        </button>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr><th>Title (EN)</th><th>Title (NP)</th><th>Published</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {notices.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>No notices yet. Add your first notice.</td></tr>
            ) : notices.map(n => (
              <tr key={n.id}>
                <td>{n.title_en}</td>
                <td>{n.title_np}</td>
                <td><span className={`badge badge--${n.is_published ? 'success' : 'warning'}`}>{n.is_published ? 'Yes' : 'Draft'}</span></td>
                <td>{new Date(n.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn admin-btn--edit" onClick={() => handleEdit(n)}>Edit</button>
                    <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(n.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">{editItem ? 'Edit Notice' : 'Add Notice'}</h2>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Title (English) *</label>
                <input className="form-input" required value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Title (Nepali) *</label>
                <input className="form-input" required value={form.title_np} onChange={e => setForm({...form, title_np: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Content (English)</label>
                <textarea className="form-textarea" value={form.content_en} onChange={e => setForm({...form, content_en: e.target.value})}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Content (Nepali)</label>
                <textarea className="form-textarea" value={form.content_np} onChange={e => setForm({...form, content_np: e.target.value})}></textarea>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="published" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} />
                <label htmlFor="published" className="form-label" style={{ marginBottom: 0 }}>Published</label>
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>Save Notice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
