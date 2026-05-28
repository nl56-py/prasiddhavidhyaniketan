'use client';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function ManagerMessagePage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.managerMessage;

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">{t(c.title, lang)}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="message-card reveal" style={{ boxShadow: 'var(--shadow-xl)' }}>
            <div className="message-card__image">
              <img src={c.image} alt={t(c.name, lang)} />
            </div>
            <div className="message-card__content">
              <h2 className="message-card__title">{t(c.name, lang)}</h2>
              <p className="message-card__role">{t(c.role, lang)}</p>
              {(lang === 'np' ? c.content.np : c.content.en).map((p, i) => (
                <p key={i} style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-4)',
                  whiteSpace: 'pre-line'
                }}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
