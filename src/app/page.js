'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function HomePage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.home;

  return (
    <div ref={ref}>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/school building .jpeg" alt="Prasiddha Vidhya Niketan" />
        </div>
        <div className="hero__decor hero__decor--1"></div>
        <div className="hero__decor hero__decor--2"></div>
        <div className="hero__decor hero__decor--3"></div>
        <div className="hero__content">
          <span className="hero__eyebrow">🏫 {t(c.hero.eyebrow, lang)}</span>
          <h1 className="hero__title">{t(c.hero.title, lang)}</h1>
          <p className="hero__subtitle">{t(c.hero.subtitle, lang)}</p>
          <p className="hero__description">{t(c.hero.description, lang)}</p>
          <div className="hero__actions">
            <Link href="/admissions" className="btn btn--primary btn--lg">{t(c.hero.primaryCTA, lang)}</Link>
            <Link href="/about" className="btn btn--secondary btn--lg">{t(c.hero.secondaryCTA, lang)}</Link>
          </div>
          <p className="hero__trust">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
            {t(c.hero.trustText, lang)}
          </p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section">
        <div className="container">
          <div className="grid grid--5 stagger reveal">
            {c.stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-card__icon">{stat.icon}</div>
                <div className="stat-card__value">{t(stat.value, lang)}</div>
                <div className="stat-card__title">{t(stat.title, lang)}</div>
                <div className="stat-card__desc">{t(stat.desc, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="about-split">
            <div className="about-split__image reveal reveal--left">
              <img src="/images/staffs.jpg" alt="School Staff" />
            </div>
            <div className="reveal reveal--right">
              <span className="section__eyebrow">{t(c.aboutPreview.eyebrow, lang)}</span>
              <h2 className="section__title" style={{ textAlign: 'left' }}>{t(c.aboutPreview.title, lang)}</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)' }}>
                {t(c.aboutPreview.description, lang)}
              </p>
              <Link href="/about" className="btn btn--outline">{t(c.aboutPreview.button, lang)}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.whyChoose.title, lang)}</h2>
            <p className="section__subtitle">{t(c.whyChoose.subtitle, lang)}</p>
          </div>
          <div className="grid grid--4 stagger reveal">
            {c.whyChoose.cards.map((card, i) => (
              <div className="card" key={i}>
                <div className="card__icon">{card.icon}</div>
                <h3 className="card__title">{t(card.title, lang)}</h3>
                <p className="card__desc">{t(card.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.programs.title, lang)}</h2>
            <p className="section__subtitle">{t(c.programs.subtitle, lang)}</p>
          </div>
          <div className="grid grid--3 stagger reveal">
            {c.programs.items.map((prog, i) => (
              <div className="program-card" key={i}>
                <div className="program-card__header">
                  <div className="program-card__icon">{prog.icon}</div>
                  <h3 className="program-card__title">{t(prog.title, lang)}</h3>
                  <p className="program-card__desc">{t(prog.desc, lang)}</p>
                </div>
                <div className="program-card__features">
                  {(lang === 'np' ? prog.features.np : prog.features.en).map((f, j) => (
                    <div className="program-card__feature" key={j}>{f}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 reveal">
            <Link href="/academics" className="btn btn--dark">{t(content.nav[lang].academics, lang) || 'View All Programs'}</Link>
          </div>
        </div>
      </section>

      {/* ===== FACILITIES ===== */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.facilitiesPreview.title, lang)}</h2>
            <p className="section__subtitle">{t(c.facilitiesPreview.subtitle, lang)}</p>
          </div>
          <div className="grid grid--4 stagger reveal">
            {c.facilitiesPreview.items.map((item, i) => (
              <div className="card" key={i}>
                <div className="card__icon">{item.icon}</div>
                <h3 className="card__title">{t(item.title, lang)}</h3>
                <p className="card__desc">{t(item.desc, lang)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 reveal">
            <Link href="/facilities" className="btn btn--outline">{content.nav[lang].facilities}</Link>
          </div>
        </div>
      </section>

      {/* ===== PRINCIPAL & MANAGER MESSAGES ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{lang === 'np' ? 'सन्देशहरू' : 'Messages from Leadership'}</h2>
          </div>
          <div className="grid grid--2" style={{ gap: 'var(--space-8)' }}>
            {/* Principal */}
            <div className="message-card reveal reveal--left">
              <div className="message-card__image">
                <img src={c.principalPreview.image} alt={t(c.principalPreview.name, lang)} />
              </div>
              <div className="message-card__content">
                <h3 className="message-card__title">{t(c.principalPreview.title, lang)}</h3>
                <p className="message-card__role">{t(c.principalPreview.name, lang)} — {t(c.principalPreview.role, lang)}</p>
                <p className="message-card__text">{t(c.principalPreview.preview, lang)}</p>
                <Link href="/principal-message" className="btn btn--outline btn--sm">{t(c.principalPreview.button, lang)}</Link>
              </div>
            </div>
            {/* Manager */}
            <div className="message-card reveal reveal--right">
              <div className="message-card__image">
                <img src={c.managerPreview.image} alt={t(c.managerPreview.name, lang)} />
              </div>
              <div className="message-card__content">
                <h3 className="message-card__title">{t(c.managerPreview.title, lang)}</h3>
                <p className="message-card__role">{t(c.managerPreview.name, lang)} — {t(c.managerPreview.role, lang)}</p>
                <p className="message-card__text">{t(c.managerPreview.preview, lang)}</p>
                <Link href="/manager-message" className="btn btn--outline btn--sm">{t(c.managerPreview.button, lang)}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.galleryPreview.title, lang)}</h2>
            <p className="section__subtitle">{t(c.galleryPreview.subtitle, lang)}</p>
          </div>
          <div className="gallery-grid stagger reveal">
            {[
              { src: '/images/kids in class.jpeg', caption: lang === 'np' ? 'कक्षागत सिकाइ' : 'Classroom Learning' },
              { src: '/images/cultural dress.jpg', caption: lang === 'np' ? 'सांस्कृतिक कार्यक्रम' : 'Cultural Program' },
              { src: '/images/student group with prize.jpeg', caption: lang === 'np' ? 'पुरस्कार वितरण' : 'Prize Ceremony' },
              { src: '/images/teacher teaching.jpeg', caption: lang === 'np' ? 'शिक्षण क्षण' : 'Teaching Moments' },
              { src: '/images/happy kids.jpeg', caption: lang === 'np' ? 'खुसी विद्यार्थीहरू' : 'Happy Students' },
              { src: '/images/cultural dress 2.jpeg', caption: lang === 'np' ? 'सांस्कृतिक पहिरन' : 'Cultural Dress' },
            ].map((img, i) => (
              <div className="gallery-item" key={i}>
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 reveal">
            <Link href="/gallery" className="btn btn--outline">{t(c.galleryPreview.button, lang)}</Link>
          </div>
        </div>
      </section>

      {/* ===== VIDEOS PREVIEW ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.videosPreview.title, lang)}</h2>
            <p className="section__subtitle">{t(c.videosPreview.subtitle, lang)}</p>
          </div>
          <div className="grid grid--3 stagger reveal">
            {[
              { src: '/videos/school advertisement.mp4', title: lang === 'np' ? 'विद्यालय परिचय' : 'School Introduction' },
              { src: '/videos/kids learning and dancing .mp4', title: lang === 'np' ? 'सिकाइ र नाच' : 'Learning & Dancing' },
              { src: '/videos/teacher teaching video.mp4', title: lang === 'np' ? 'शिक्षण गतिविधि' : 'Teaching Activity' },
            ].map((vid, i) => (
              <div className="video-card" key={i}>
                <video controls preload="metadata" poster="">
                  <source src={vid.src} type="video/mp4" />
                </video>
                <div className="video-card__info">
                  <h3 className="video-card__title">{vid.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 reveal">
            <Link href="/videos-page" className="btn btn--outline">{t(c.videosPreview.button, lang)}</Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.testimonials.title, lang)}</h2>
          </div>
          <div className="grid grid--3 stagger reveal">
            {c.testimonials.items.map((test, i) => (
              <div className="card card--glass" key={i}>
                <div className="testimonial-card__quote">"</div>
                <p className="testimonial-card__text" style={{ color: 'rgba(255,255,255,0.8)' }}>{t(test.text, lang)}</p>
                <p className="testimonial-card__name" style={{ color: 'var(--color-accent)' }}>— {t(test.name, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NOTICES PREVIEW ===== */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.noticesPreview.title, lang)}</h2>
            <p className="section__subtitle">{t(c.noticesPreview.subtitle, lang)}</p>
          </div>
          <div className="grid grid--3 stagger reveal">
            {[
              { title: { en: 'Admission Open for New Academic Session', np: 'नयाँ शैक्षिक सत्रका लागि भर्ना खुला' }, excerpt: { en: 'Admissions are open for Nursery to Grade 8. Parents are requested to contact the school office for details.', np: 'नर्सरीदेखि कक्षा ८ सम्म भर्ना खुला गरिएको छ। थप जानकारीका लागि विद्यालय कार्यालयमा सम्पर्क गर्नुहोस्।' }, date: '2082/01/15' },
              { title: { en: 'Parent-Teacher Meeting Notice', np: 'अभिभावक-शिक्षक बैठक सूचना' }, excerpt: { en: 'Parents are invited to attend the upcoming meeting to discuss student progress and classroom performance.', np: 'विद्यार्थीको प्रगति र कक्षागत प्रदर्शनबारे छलफल गर्न अभिभावकहरूलाई बैठकमा आमन्त्रण गरिन्छ।' }, date: '2082/01/10' },
              { title: { en: 'Examination Schedule Published', np: 'परीक्षा तालिका प्रकाशित' }, excerpt: { en: 'The examination routine has been published. Students are advised to prepare according to the schedule.', np: 'परीक्षा तालिका प्रकाशित गरिएको छ। विद्यार्थीहरूलाई तालिका अनुसार तयारी गर्न अनुरोध गरिन्छ।' }, date: '2082/01/05' },
            ].map((notice, i) => (
              <div className="notice-card" key={i}>
                <span className="notice-card__date">{notice.date}</span>
                <h3 className="notice-card__title">{t(notice.title, lang)}</h3>
                <p className="notice-card__excerpt">{t(notice.excerpt, lang)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 reveal">
            <Link href="/notices" className="btn btn--outline">{t(c.noticesPreview.button, lang)}</Link>
          </div>
        </div>
      </section>

      {/* ===== ADMISSION CTA ===== */}
      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-section__title">{t(c.admissionCTA.title, lang)}</h2>
          <p className="cta-section__desc">{t(c.admissionCTA.desc, lang)}</p>
          <div className="cta-section__actions">
            <Link href="/admissions" className="btn btn--primary btn--lg">{t(c.admissionCTA.primaryBtn, lang)}</Link>
            <Link href="/contact" className="btn btn--secondary btn--lg">{t(c.admissionCTA.secondaryBtn, lang)}</Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="section section--alt">
        <div className="container text-center reveal">
          <h2 className="section__title">{t(c.contactCTA.title, lang)}</h2>
          <p className="section__subtitle">{t(c.contactCTA.desc, lang)}</p>
          <div className="mt-8">
            <Link href="/contact" className="btn btn--dark btn--lg">{t(c.contactCTA.button, lang)}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
