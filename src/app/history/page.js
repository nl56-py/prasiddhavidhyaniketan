'use client';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function HistoryPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.history;

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">{t(c.title, lang)}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="reveal" style={{ position: 'relative', paddingLeft: 'var(--space-10)', borderLeft: '3px solid var(--color-primary-100)' }}>
            {(lang === 'np' ? c.content.np : c.content.en).map((p, i) => (
              <div key={i} style={{ marginBottom: 'var(--space-8)', position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 'calc(-1 * var(--space-10) - 7px)', top: '6px',
                  width: 14, height: 14, borderRadius: '50%',
                  background: i === 0 ? 'var(--color-accent)' : 'var(--color-primary-200)',
                  border: '3px solid var(--color-white)', boxShadow: 'var(--shadow-sm)'
                }}></div>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-lg)' }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
