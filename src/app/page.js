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
      <section className="section" style={{ background: 'var(--color-bg)', padding: 'var(--space-12) 0' }}>
        <div className="container">
          <div className="hero-split">
            <div className="hero-split__content reveal reveal--left">
              <span className="hero__eyebrow">🏫 {t(c.hero.eyebrow, lang)}</span>
              <h1 className="hero-split__title">
                {lang === 'np' ? 'नानीबाबुको उज्ज्वल भविष्यका लागि ' : 'Nurturing Young Minds for a '}
                <span className="accent">{lang === 'np' ? 'संस्कारयुक्त शिक्षा' : 'Brighter Future'}</span>
              </h1>
              <p className="hero-split__subtitle">{t(c.hero.subtitle, lang)}. {t(c.hero.description, lang)}</p>
              <div className="hero__actions" style={{ marginBottom: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/admissions" className="btn btn--primary btn--lg">{t(c.hero.primaryCTA, lang)}</Link>
                <Link href="/about" className="btn btn--secondary btn--lg">{t(c.hero.secondaryCTA, lang)}</Link>
              </div>
              <div className="hero-split__features">
                <div className="hero-split__feature-badge">
                  <span className="hero-split__feature-icon">🛡️</span>
                  {lang === 'np' ? 'सुरक्षित वातावरण' : 'Safe Campus'}
                </div>
                <div className="hero-split__feature-badge">
                  <span className="hero-split__feature-icon">🚌</span>
                  {lang === 'np' ? 'बस सुविधा' : 'Transportation'}
                </div>
                <div className="hero-split__feature-badge">
                  <span className="hero-split__feature-icon">🧩</span>
                  {lang === 'np' ? 'मन्टेश्वरी पद्धति' : 'Montेश्वरी Method'}
                </div>
              </div>
            </div>
            
            <div className="hero-collage reveal reveal--right">
              <div className="hero-collage__col">
                <img src="/images/kids in class.jpeg" alt="Students in Classroom" className="hero-collage__img" style={{ height: '180px' }} />
                <img src="/images/happy kids.jpeg" alt="Happy Students" className="hero-collage__img" style={{ height: '220px' }} />
              </div>
              <div className="hero-collage__col hero-collage__col--pt">
                <img src="/images/cultural dress.jpg" alt="Cultural Activities" className="hero-collage__img" style={{ height: '240px' }} />
                <div className="hero-collage__badge">
                  {t(c.stats[0].value, lang)}
                  <span>{t(c.stats[0].title, lang)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section section--alt" style={{ padding: 'var(--space-12) 0' }}>
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
      <section className="section">
        <div className="container">
          <div className="about-split reveal">
            <div className="about-split__image-wrapper about-motto-container">
              <img src="/images/staffs.jpg" alt="School Staff" className="hero-collage__img" style={{ height: '420px', width: '100%', objectFit: 'cover' }} />
              <div className="about-motto-card">
                <p className="about-motto-card__text">"{t(content.school.motto, lang)}"</p>
                <p className="about-motto-card__author">— {t(content.school.shortName, lang)}</p>
              </div>
            </div>
            <div>
              <span className="section__eyebrow">{t(c.aboutPreview.eyebrow, lang)}</span>
              <h2 className="section__title" style={{ textAlign: 'left', marginBottom: 'var(--space-6)' }}>{t(c.aboutPreview.title, lang)}</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                {t(c.aboutPreview.description, lang)}
              </p>
              <Link href="/about" className="link-arrow-hover">
                {t(c.aboutPreview.button, lang)} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDATION (VISION & MISSION) ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(content.missionVision.title, lang)}</h2>
            <p className="section__subtitle">{t(content.missionVision.subtitle, lang)}</p>
          </div>
          <div className="grid grid--3 stagger reveal">
            <div className="card" style={{ background: 'var(--color-surface)' }}>
              <div className="card__icon" style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>👁️</div>
              <h3 className="card__title">{t(content.missionVision.vision.title, lang)}</h3>
              <p className="card__desc">{t(content.missionVision.vision.content, lang)}</p>
            </div>
            <div className="card" style={{ background: 'var(--color-surface)' }}>
              <div className="card__icon" style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>🚀</div>
              <h3 className="card__title">{t(content.missionVision.mission.title, lang)}</h3>
              <p className="card__desc">{t(content.missionVision.mission.content, lang)}</p>
            </div>
            <div className="card" style={{ background: 'var(--color-surface)' }}>
              <div className="card__icon" style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>💎</div>
              <h3 className="card__title">{lang === 'np' ? 'मूल मान्यताहरू' : 'Core Values'}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                {(lang === 'np' ? ['अनुशासन', 'इमानदारी', 'सिर्जनशीलता', 'सम्मान'] : ['DISCIPLINE', 'INTEGRITY', 'CREATIVITY', 'RESPECT']).map((val, idx) => (
                  <span key={idx} style={{ background: 'var(--color-bg-alt)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: '700', color: 'var(--color-primary)' }}>
                    {val}
                  </span>
                ))}
              </div>
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
              <div className="card card--choose-hover" key={i}>
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
              <div className="program-card" key={i} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="program-card__header" style={{ flexGrow: 1 }}>
                  <div className="program-card__icon">{prog.icon}</div>
                  <h3 className="program-card__title">{t(prog.title, lang)}</h3>
                  <p className="program-card__desc">{t(prog.desc, lang)}</p>
                </div>
                <div className="program-card__features" style={{ background: 'var(--color-bg-alt)', padding: 'var(--space-6)' }}>
                  {(lang === 'np' ? prog.features.np : prog.features.en).slice(0, 3).map((f, j) => (
                    <div className="program-card__feature" key={j} style={{ borderBottomColor: 'rgba(0,0,0,0.05)' }}>{f}</div>
                  ))}
                  <div style={{ marginTop: 'var(--space-6)' }}>
                    <Link href="/academics" className="btn btn--primary btn--sm" style={{ width: '100%', textAlign: 'center' }}>
                      {lang === 'np' ? 'तह विवरण हेर्नुहोस्' : 'Explore Details'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRINCIPAL & MANAGER MESSAGES ===== */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{lang === 'np' ? 'नेतृत्वको सन्देश' : 'Message from Leadership'}</h2>
          </div>
          <div className="grid grid--2" style={{ gap: 'var(--space-8)' }}>
            {/* Principal */}
            <div className="card reveal reveal--left" style={{ borderTop: '8px solid var(--color-primary)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card--message-header">
                <img src={c.principalPreview.image} alt={t(c.principalPreview.name, lang)} className="card--message-avatar" />
                <div>
                  <h3 className="card__title" style={{ margin: 0 }}>{t(c.principalPreview.name, lang)}</h3>
                  <p style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t(c.principalPreview.role, lang)}</p>
                </div>
              </div>
              <div style={{ flexGrow: 1 }}>
                <p className="card--message-quote">"{t(c.principalPreview.preview, lang)}"</p>
              </div>
              <div style={{ marginTop: 'var(--space-6)' }}>
                <Link href="/principal-message" className="btn btn--outline btn--sm">{t(c.principalPreview.button, lang)}</Link>
              </div>
            </div>
            
            {/* Manager */}
            <div className="card reveal reveal--right" style={{ borderTop: '8px solid var(--color-accent)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card--message-header">
                <img src={c.managerPreview.image} alt={t(c.managerPreview.name, lang)} className="card--message-avatar" />
                <div>
                  <h3 className="card__title" style={{ margin: 0 }}>{t(c.managerPreview.name, lang)}</h3>
                  <p style={{ color: 'var(--color-accent-dark)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t(c.managerPreview.role, lang)}</p>
                </div>
              </div>
              <div style={{ flexGrow: 1 }}>
                <p className="card--message-quote">"{t(c.managerPreview.preview, lang)}"</p>
              </div>
              <div style={{ marginTop: 'var(--space-6)' }}>
                <Link href="/manager-message" className="btn btn--outline btn--sm">{t(c.managerPreview.button, lang)}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.galleryPreview.title, lang)}</h2>
            <p className="section__subtitle">{t(c.galleryPreview.subtitle, lang)}</p>
          </div>
          
          <div className="gallery-staggered stagger reveal">
            <div className="gallery-staggered__col">
              <div className="gallery-item" style={{ height: '200px' }}>
                <img src="/images/kids in class.jpeg" alt="Classroom" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{lang === 'np' ? 'कक्षागत सिकाइ' : 'Classroom Learning'}</span>
                </div>
              </div>
              <div className="gallery-item" style={{ height: '180px' }}>
                <img src="/images/happy kids.jpeg" alt="Happy kids" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{lang === 'np' ? 'खुसी विद्यार्थीहरू' : 'Happy Students'}</span>
                </div>
              </div>
            </div>
            
            <div className="gallery-staggered__col gallery-staggered__col--pt">
              <div className="gallery-item" style={{ height: '300px' }}>
                <img src="/images/cultural dress.jpg" alt="Cultural" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{lang === 'np' ? 'सांस्कृतिक कार्यक्रम' : 'Cultural Program'}</span>
                </div>
              </div>
            </div>
            
            <div className="gallery-staggered__col">
              <div className="gallery-item" style={{ height: '180px' }}>
                <img src="/images/student group with prize.jpeg" alt="Prize" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{lang === 'np' ? 'पुरस्कार वितरण' : 'Prize Ceremony'}</span>
                </div>
              </div>
              <div className="gallery-item" style={{ height: '200px' }}>
                <img src="/images/cultural dress 2.jpeg" alt="Cultural dress" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{lang === 'np' ? 'सांस्कृतिक पहिरन' : 'Cultural Dress'}</span>
                </div>
              </div>
            </div>
            
            <div className="gallery-staggered__col gallery-staggered__col--pt">
              <div className="gallery-item" style={{ height: '180px' }}>
                <img src="/images/teacher teaching.jpeg" alt="Teaching" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{lang === 'np' ? 'शिक्षण क्षण' : 'Teaching Moments'}</span>
                </div>
              </div>
              <div className="gallery-staggered__card-text">
                {lang === 'np' ? 'हाम्रो जीवन्त समुदायमा जोडिनुहोस्!' : 'Join our vibrant community!'}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 reveal">
            <Link href="/gallery" className="btn btn--outline">{t(c.galleryPreview.button, lang)}</Link>
          </div>
        </div>
      </section>

      {/* ===== VIDEOS PREVIEW ===== */}
      <section className="section">
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
      <section className="section section--alt">
        <div className="container">
          <div className="section__header reveal">
            <h2 className="section__title">{t(c.testimonials.title, lang)}</h2>
          </div>
          <div className="grid grid--3 stagger reveal">
            {c.testimonials.items.map((test, i) => {
              const isEven = i % 2 === 0;
              return (
                <div className="card card--testimonial" key={i}>
                  <span className={`card--testimonial-badge ${isEven ? 'card--testimonial-badge--accent' : ''}`}>
                    {isEven ? (lang === 'np' ? 'अभिभावक' : 'PARENT') : (lang === 'np' ? 'विद्यार्थी' : 'STUDENT')}
                  </span>
                  <div className="card--testimonial-profile">
                    <div className={`card--testimonial-avatar ${isEven ? 'card--testimonial-avatar--accent' : ''}`}>
                      {isEven ? '👤' : '🎓'}
                    </div>
                    <div>
                      <h5 className="card__title" style={{ margin: 0, fontSize: 'var(--text-base)' }}>{t(test.name, lang)}</h5>
                    </div>
                  </div>
                  <p className="card__desc" style={{ fontStyle: 'italic' }}>"{t(test.text, lang)}"</p>
                </div>
              );
            })}
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
              <div className="notice-card" key={i} style={{ borderRadius: 'var(--radius-2xl)', borderLeft: '5px solid var(--color-accent)' }}>
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
      <section className="container">
        <div className="cta-section cta-section--premium reveal">
          <h2 className="cta-section__title">{t(c.admissionCTA.title, lang)}</h2>
          <p className="cta-section__desc">{t(c.admissionCTA.desc, lang)}</p>
          <div className="cta-section__actions">
            <Link href="/admissions" className="btn btn--secondary btn--lg" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', borderColor: 'var(--color-accent)' }}>{t(c.admissionCTA.primaryBtn, lang)}</Link>
            <Link href="/contact" className="btn btn--secondary btn--lg" style={{ background: 'var(--color-white)', color: 'var(--color-primary)', borderColor: 'var(--color-white)' }}>{t(c.admissionCTA.secondaryBtn, lang)}</Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="section section--alt" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container text-center reveal">
          <h2 className="section__title">{t(c.contactCTA.title, lang)}</h2>
          <p className="section__subtitle" style={{ marginBottom: 'var(--space-6)' }}>{t(c.contactCTA.desc, lang)}</p>
          <div>
            <Link href="/contact" className="btn btn--primary btn--lg">{t(c.contactCTA.button, lang)}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
