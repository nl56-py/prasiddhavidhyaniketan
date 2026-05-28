'use client';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';
import Link from 'next/link';

export default function AcademicsPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.home.programs;

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
          {c.items.map((prog, i) => (
            <div key={i} id={['nursery', 'primary', 'middle'][i]} className="reveal" style={{
              marginBottom: 'var(--space-12)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-10)',
              alignItems: 'center',
              direction: i % 2 === 1 ? 'rtl' : 'ltr'
            }}>
              <div style={{ direction: 'ltr' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>{prog.icon}</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
                  {t(prog.title, lang)}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                  {t(prog.desc, lang)}
                </p>
                <div>
                  {(lang === 'np' ? prog.features.np : prog.features.en).map((f, j) => (
                    <div className="program-card__feature" key={j} style={{ direction: 'ltr' }}>{f}</div>
                  ))}
                </div>
              </div>
              <div style={{
                direction: 'ltr',
                background: `linear-gradient(135deg, ${prog.color}20, ${prog.color}10)`,
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem',
                minHeight: 300
              }}>
                {prog.icon}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-section__title">{t(content.home.admissionCTA.title, lang)}</h2>
          <p className="cta-section__desc">{t(content.home.admissionCTA.desc, lang)}</p>
          <div className="cta-section__actions">
            <Link href="/admissions" className="btn btn--primary btn--lg">{t(content.home.admissionCTA.primaryBtn, lang)}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
