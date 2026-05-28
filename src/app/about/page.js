'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function AboutPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.about;

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">{t(c.hero.title, lang)}</h1>
          <p className="page-hero__subtitle">{t(c.hero.subtitle, lang)}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-split reveal">
            <div className="about-split__image">
              <img src="/images/school building .jpeg" alt="School Building" />
            </div>
            <div>
              {(lang === 'np' ? c.content.np : c.content.en).map((p, i) => (
                <p key={i} style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-5)' }}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{lang === 'np' ? 'हाम्रो नेतृत्व' : 'Our Leadership'}</h2>
          </div>
          <div className="grid grid--3 stagger reveal">
            {[
              { name: content.school.founder, role: { en: 'Founder & Operator', np: 'संस्थापक तथा सञ्चालक' }, image: '/images/dhankumari operator .jpeg' },
              { name: content.school.manager, role: { en: 'Manager', np: 'व्यवस्थापक' }, image: '/images/joshi sir .jpeg' },
              { name: content.school.principal, role: { en: 'Principal', np: 'प्रधानाध्यापक' }, image: '/images/prinicipal.jpeg' },
            ].map((leader, i) => (
              <div className="card" key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', margin: '0 auto var(--space-4)', border: '3px solid var(--color-primary-50)' }}>
                  <img src={leader.image} alt={t(leader.name, lang)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 className="card__title" style={{ textAlign: 'center' }}>{t(leader.name, lang)}</h3>
                <p style={{ color: 'var(--color-accent-dark)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t(leader.role, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid--4 stagger reveal">
            {c.cards.map((card, i) => (
              <div className="card" key={i}>
                <div className="card__icon">{card.icon}</div>
                <h3 className="card__title">{t(card.title, lang)}</h3>
                <p className="card__desc">{t(card.desc, lang)}</p>
              </div>
            ))}
          </div>
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
