'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ image_url: '', caption_en: '', caption_np: '', category: 'general' });

  useEffect(() => { loadImages(); }, []);

  const loadImages = async () => {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setImages(data || []);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await supabase.from('gallery').insert([form]);
    setShowModal(false);
    setForm({ image_url: '', caption_en: '', caption_np: '', category: 'general' });
    loadImages();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this image?')) {
      await supabase.from('gallery').delete().eq('id', id);
      loadImages();
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Gallery</h1>
        <button className="btn btn--primary btn--sm" onClick={() => setShowModal(true)}>+ Add Image</button>
      </div>

      <div className="gallery-grid">
        {images.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>
            No gallery images yet. Connect Supabase and add images.
          </div>
        ) : images.map(img => (
          <div key={img.id} className="gallery-item" style={{ position: 'relative' }}>
            <img src={img.image_url} alt={img.caption_en} />
            <div className="gallery-item__overlay" style={{ opacity: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
                <span className="gallery-item__caption">{img.caption_en}</span>
                <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(img.id)} style={{ color: 'white', background: 'rgba(198,40,40,0.8)' }}>×</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">Add Gallery Image</h2>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Image URL *</label>
                <input className="form-input" required value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label className="form-label">Caption (English)</label>
                <input className="form-input" value={form.caption_en} onChange={e => setForm({...form, caption_en: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Caption (Nepali)</label>
                <input className="form-input" value={form.caption_np} onChange={e => setForm({...form, caption_np: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option value="general">General</option>
                  <option value="events">Events</option>
                  <option value="classroom">Classroom</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>Add Image</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
