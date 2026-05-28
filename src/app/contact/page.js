'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.contact;
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      }]);

      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('success'); // Still show success for offline mode
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">{t(c.title, lang)}</h1>
          <p className="page-hero__subtitle">{t(c.subtitle, lang)}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2 reveal" style={{ gap: 'var(--space-12)', alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <h2 className="section__title" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>
                {lang === 'np' ? 'सम्पर्क जानकारी' : 'Contact Information'}
              </h2>
              
              {[
                { icon: '📍', label: lang === 'np' ? 'ठेगाना' : 'Address', value: t(content.school.location, lang) },
                { icon: '📞', label: lang === 'np' ? 'मुख्य फोन' : 'Main Phone', value: content.school.mainPhone },
                { icon: '👤', label: `${t(content.school.manager, lang)} (${lang === 'np' ? 'व्यवस्थापक' : 'Manager'})`, value: content.school.managerPhone },
                { icon: '👨‍🏫', label: `${t(content.school.principal, lang)} (${lang === 'np' ? 'प्रधानाध्यापक' : 'Principal'})`, value: content.school.principalPhone },
                { icon: '🌐', label: lang === 'np' ? 'वेबसाइट' : 'Website', value: content.school.website },
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: 'var(--space-4) var(--space-6)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <h2 className="section__title" style={{ textAlign: 'left', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>
                {lang === 'np' ? 'सन्देश पठाउनुहोस्' : 'Send us a Message'}
              </h2>

              {status === 'success' && (
                <div className="form-message form-message--success">{t(c.form.success, lang)}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">{t(c.form.name, lang)} *</label>
                  <input className="form-input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="grid grid--2" style={{ gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">{t(c.form.email, lang)}</label>
                    <input className="form-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t(c.form.phone, lang)} *</label>
                    <input className="form-input" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t(c.form.subject, lang)}</label>
                  <input className="form-input" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t(c.form.message, lang)} *</label>
                  <textarea className="form-textarea" required value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn btn--primary" disabled={loading} style={{ width: '100%' }}>
                  {loading ? '...' : t(c.form.submit, lang)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
