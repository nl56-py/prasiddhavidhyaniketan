'use client';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function FacilitiesPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.home.facilitiesPreview;

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
          <div className="grid grid--4 stagger reveal">
            {c.items.map((item, i) => (
              <div className="card" key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>{item.icon}</div>
                <h3 className="card__title" style={{ textAlign: 'center' }}>{t(item.title, lang)}</h3>
                <p className="card__desc">{t(item.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility photos */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{lang === 'np' ? 'हाम्रो विद्यालय परिसर' : 'Our School Campus'}</h2>
          </div>
          <div className="gallery-grid stagger reveal">
            {[
              { src: '/images/school building .jpeg', caption: lang === 'np' ? 'विद्यालय भवन' : 'School Building' },
              { src: '/images/kids in class.jpeg', caption: lang === 'np' ? 'कक्षाकोठा' : 'Classroom' },
              { src: '/images/stduent in class.jpeg', caption: lang === 'np' ? 'सिकाइ वातावरण' : 'Learning Environment' },
              { src: '/images/happy kids.jpeg', caption: lang === 'np' ? 'खेलमैदान' : 'Play Area' },
            ].map((img, i) => (
              <div className="gallery-item" key={i}>
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
