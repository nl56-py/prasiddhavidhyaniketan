'use client';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

const videos = [
  { src: '/videos/school advertisement.mp4', title: { en: 'School Introduction', np: 'विद्यालय परिचय' }, desc: { en: 'A comprehensive overview of our school, facilities, and educational approach.', np: 'हाम्रो विद्यालय, सुविधा र शैक्षिक पद्धतिको समग्र परिचय।' } },
  { src: '/videos/kids learning and dancing .mp4', title: { en: 'Learning Through Activities', np: 'क्रियाकलापमार्फत सिकाइ' }, desc: { en: 'Students learn better when they explore, participate, and practice.', np: 'विद्यार्थीहरूले अन्वेषण, सहभागिता र अभ्यासमार्फत अझ प्रभावकारी रूपमा सिक्छन्।' } },
  { src: '/videos/teacher teaching video.mp4', title: { en: 'Classroom Moments', np: 'कक्षागत क्षणहरू' }, desc: { en: 'A glimpse of meaningful classroom learning and student participation.', np: 'अर्थपूर्ण कक्षागत सिकाइ र विद्यार्थी सहभागिताका झलकहरू।' } },
  { src: '/videos/kids learning in class.mp4', title: { en: 'Interactive Learning', np: 'अन्तरक्रियात्मक सिकाइ' }, desc: { en: 'Students engage in interactive and hands-on learning activities.', np: 'विद्यार्थीहरू अन्तरक्रियात्मक र व्यवहारिक सिकाइ क्रियाकलापमा संलग्न।' } },
  { src: '/videos/video by lamki.mp4', title: { en: 'School Events & Celebrations', np: 'विद्यालय कार्यक्रम र उत्सव' }, desc: { en: 'Celebrations help students build confidence, culture, and teamwork.', np: 'उत्सवहरूले विद्यार्थीमा आत्मविश्वास, संस्कृति र सहकार्यको भावना विकास गर्छन्।' } },
];

export default function VideosPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.home.videosPreview;

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
          <div className="grid grid--2 stagger reveal">
            {videos.map((vid, i) => (
              <div className="video-card" key={i}>
                <video controls preload="metadata">
                  <source src={vid.src} type="video/mp4" />
                </video>
                <div className="video-card__info">
                  <h3 className="video-card__title">{t(vid.title, lang)}</h3>
                  <p className="video-card__desc">{t(vid.desc, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
