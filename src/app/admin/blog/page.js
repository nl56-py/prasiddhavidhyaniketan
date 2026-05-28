'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title_en: '', title_np: '', content_en: '', content_np: '', excerpt_en: '', excerpt_np: '', image_url: '', slug: '', is_published: true });

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
  };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...form, slug: form.slug || generateSlug(form.title_en) };
    if (editItem) {
      await supabase.from('blog_posts').update(payload).eq('id', editItem.id);
    } else {
      await supabase.from('blog_posts').insert([payload]);
    }
    setShowModal(false);
    setEditItem(null);
    setForm({ title_en: '', title_np: '', content_en: '', content_np: '', excerpt_en: '', excerpt_np: '', image_url: '', slug: '', is_published: true });
    loadPosts();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm({ title_en: item.title_en, title_np: item.title_np, content_en: item.content_en, content_np: item.content_np, excerpt_en: item.excerpt_en || '', excerpt_np: item.excerpt_np || '', image_url: item.image_url || '', slug: item.slug, is_published: item.is_published });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this blog post?')) {
      await supabase.from('blog_posts').delete().eq('id', id);
      loadPosts();
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Blog Posts</h1>
        <button className="btn btn--primary btn--sm" onClick={() => { setEditItem(null); setForm({ title_en: '', title_np: '', content_en: '', content_np: '', excerpt_en: '', excerpt_np: '', image_url: '', slug: '', is_published: true }); setShowModal(true); }}>
          + New Post
        </button>
      </div>

      <div className="admin-table">
        <table>
          <thead><tr><th>Title</th><th>Slug</th><th>Published</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {posts.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>No blog posts yet.</td></tr>
            ) : posts.map(p => (
              <tr key={p.id}>
                <td>{p.title_en}</td>
                <td><code style={{ fontSize: 'var(--text-xs)', background: 'var(--color-surface-alt)', padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>{p.slug}</code></td>
                <td><span className={`badge badge--${p.is_published ? 'success' : 'warning'}`}>{p.is_published ? 'Yes' : 'Draft'}</span></td>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn admin-btn--edit" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 700 }}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">{editItem ? 'Edit Post' : 'New Blog Post'}</h2>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="grid grid--2" style={{ gap: 'var(--space-4)' }}>
                <div className="form-group"><label className="form-label">Title (EN) *</label><input className="form-input" required value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Title (NP) *</label><input className="form-input" required value={form.title_np} onChange={e => setForm({...form, title_np: e.target.value})} /></div>
              </div>
              <div className="grid grid--2" style={{ gap: 'var(--space-4)' }}>
                <div className="form-group"><label className="form-label">Excerpt (EN)</label><textarea className="form-textarea" style={{ minHeight: 60 }} value={form.excerpt_en} onChange={e => setForm({...form, excerpt_en: e.target.value})}></textarea></div>
                <div className="form-group"><label className="form-label">Excerpt (NP)</label><textarea className="form-textarea" style={{ minHeight: 60 }} value={form.excerpt_np} onChange={e => setForm({...form, excerpt_np: e.target.value})}></textarea></div>
              </div>
              <div className="form-group"><label className="form-label">Content (EN)</label><textarea className="form-textarea" style={{ minHeight: 150 }} value={form.content_en} onChange={e => setForm({...form, content_en: e.target.value})}></textarea></div>
              <div className="form-group"><label className="form-label">Content (NP)</label><textarea className="form-textarea" style={{ minHeight: 150 }} value={form.content_np} onChange={e => setForm({...form, content_np: e.target.value})}></textarea></div>
              <div className="grid grid--2" style={{ gap: 'var(--space-4)' }}>
                <div className="form-group"><label className="form-label">Image URL</label><input className="form-input" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Slug</label><input className="form-input" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="auto-generated" /></div>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="pub" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} />
                <label htmlFor="pub" className="form-label" style={{ marginBottom: 0 }}>Published</label>
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>Save Post</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
