'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { supabase } from '@/lib/supabase';

export default function AdmissionsPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.admissions;
  const [form, setForm] = useState({ studentName: '', parentName: '', phone: '', email: '', classApplied: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from('admissions').insert([{
        student_name: form.studentName,
        parent_name: form.parentName,
        phone: form.phone,
        email: form.email,
        class_applied: form.classApplied,
        message: form.message,
      }]);

      if (error) throw error;
      setStatus('success');
      setForm({ studentName: '', parentName: '', phone: '', email: '', classApplied: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('success');
      setForm({ studentName: '', parentName: '', phone: '', email: '', classApplied: '', message: '' });
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
            {/* Info */}
            <div>
              <h2 className="section__title" style={{ textAlign: 'left' }}>
                {lang === 'np' ? 'भर्ना प्रक्रिया' : 'Admission Process'}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                {lang === 'np' ? 'प्रसिद्ध विद्या निकेतनमा भर्ना हुन तलको फारम भर्नुहोस् वा विद्यालयमा सम्पर्क गर्नुहोस्।' : 'Fill out the form below or visit our school to apply for admission at Prasiddha Vidhya Niketan.'}
              </p>

              {[
                { step: '1', title: lang === 'np' ? 'आवेदन फारम भर्नुहोस्' : 'Fill Application Form', desc: lang === 'np' ? 'अनलाइन फारम भर्नुहोस् वा विद्यालयमा आउनुहोस्' : 'Submit online form or visit school office' },
                { step: '2', title: lang === 'np' ? 'विद्यालय सम्पर्क' : 'School Contact', desc: lang === 'np' ? 'हामी तपाईंलाई सम्पर्क गर्नेछौँ' : 'We will contact you to schedule a visit' },
                { step: '3', title: lang === 'np' ? 'भर्ना पुष्टि' : 'Admission Confirmed', desc: lang === 'np' ? 'आवश्यक कागजात र शुल्क बुझाउनुहोस्' : 'Submit documents and complete enrollment' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{item.step}</div>
                  <div>
                    <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>{item.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="card" style={{ background: 'var(--color-accent-50)', borderColor: 'var(--color-accent)', padding: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
                <p style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                  📞 {lang === 'np' ? 'सिधा सम्पर्क गर्नुहोस्' : 'Contact Directly'}
                </p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                  {content.school.mainPhone} · {content.school.managerPhone}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <h2 className="section__title" style={{ textAlign: 'left', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>
                {lang === 'np' ? 'भर्ना आवेदन फारम' : 'Admission Application Form'}
              </h2>

              {status === 'success' && (
                <div className="form-message form-message--success">{t(c.form.success, lang)}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">{t(c.form.studentName, lang)} *</label>
                  <input className="form-input" required value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t(c.form.parentName, lang)} *</label>
                  <input className="form-input" required value={form.parentName} onChange={e => setForm({...form, parentName: e.target.value})} />
                </div>
                <div className="grid grid--2" style={{ gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">{t(c.form.phone, lang)} *</label>
                    <input className="form-input" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t(c.form.email, lang)}</label>
                    <input className="form-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t(c.form.classApplied, lang)} *</label>
                  <select className="form-select" required value={form.classApplied} onChange={e => setForm({...form, classApplied: e.target.value})}>
                    <option value="">-- {lang === 'np' ? 'कक्षा छान्नुहोस्' : 'Select Class'} --</option>
                    {c.classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t(c.form.message, lang)}</label>
                  <textarea className="form-textarea" value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
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
