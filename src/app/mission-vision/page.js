'use client';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function MissionVisionPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.missionVision;

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
          <div className="grid grid--2 reveal" style={{ gap: 'var(--space-10)', marginBottom: 'var(--space-16)' }}>
            {/* Mission */}
            <div className="card" style={{ borderTop: '4px solid var(--color-primary)', textAlign: 'center', padding: 'var(--space-10)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🎯</div>
              <h2 className="card__title" style={{ fontSize: 'var(--text-2xl)', textAlign: 'center' }}>{t(c.mission.title, lang)}</h2>
              <p className="card__desc" style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>{t(c.mission.content, lang)}</p>
            </div>
            {/* Vision */}
            <div className="card" style={{ borderTop: '4px solid var(--color-accent)', textAlign: 'center', padding: 'var(--space-10)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🔭</div>
              <h2 className="card__title" style={{ fontSize: 'var(--text-2xl)', textAlign: 'center' }}>{t(c.vision.title, lang)}</h2>
              <p className="card__desc" style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>{t(c.vision.content, lang)}</p>
            </div>
          </div>

          {/* Values */}
          <div className="section__header reveal">
            <h2 className="section__title">{lang === 'np' ? 'हाम्रो मूल्यहरू' : 'Our Core Values'}</h2>
          </div>
          <div className="grid grid--3 stagger reveal">
            {c.values.map((val, i) => (
              <div className="card" key={i}>
                <div className="card__icon">{val.icon}</div>
                <h3 className="card__title">{t(val.title, lang)}</h3>
                <p className="card__desc">{t(val.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
