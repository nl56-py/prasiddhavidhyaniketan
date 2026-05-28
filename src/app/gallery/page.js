'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

const galleryImages = [
  { src: '/images/kids in class.jpeg', caption: { en: 'Students in classroom learning activities', np: 'कक्षागत सिकाइ क्रियाकलापमा विद्यार्थीहरू' } },
  { src: '/images/cultural dress.jpg', caption: { en: 'Cultural dress program', np: 'सांस्कृतिक पहिरन कार्यक्रम' } },
  { src: '/images/cultural dress 2.jpeg', caption: { en: 'Cultural celebration moments', np: 'सांस्कृतिक उत्सवका क्षणहरू' } },
  { src: '/images/student group with prize.jpeg', caption: { en: 'Students with prizes and achievements', np: 'पुरस्कार र उपलब्धिसहित विद्यार्थीहरू' } },
  { src: '/images/student with prize.jpeg', caption: { en: 'Prize distribution ceremony', np: 'पुरस्कार वितरण समारोह' } },
  { src: '/images/teacher teaching.jpeg', caption: { en: 'Teacher engaging students in classroom', np: 'शिक्षकले कक्षामा विद्यार्थीलाई सिकाउँदै' } },
  { src: '/images/happy kids.jpeg', caption: { en: 'Happy and confident students', np: 'खुसी र आत्मविश्वासी विद्यार्थीहरू' } },
  { src: '/images/stduent in class.jpeg', caption: { en: 'Active classroom participation', np: 'सक्रिय कक्षागत सहभागिता' } },
  { src: '/images/staffs.jpg', caption: { en: 'Our dedicated teaching staff', np: 'हाम्रो समर्पित शिक्षक टोली' } },
  { src: '/images/school building .jpeg', caption: { en: 'School campus and building', np: 'विद्यालय परिसर र भवन' } },
  { src: '/images/manager with student.jpeg', caption: { en: 'Manager interacting with students', np: 'व्यवस्थापक विद्यार्थीसँग' } },
  { src: '/images/manager in office.jpeg', caption: { en: 'School management office', np: 'विद्यालय व्यवस्थापन कार्यालय' } },
];

export default function GalleryPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const [lightboxImg, setLightboxImg] = useState(null);
  const c = content.home.galleryPreview;

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
          <div className="gallery-grid stagger reveal">
            {galleryImages.map((img, i) => (
              <div className="gallery-item" key={i} onClick={() => setLightboxImg(img)}>
                <img src={img.src} alt={t(img.caption, lang)} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__caption">{t(img.caption, lang)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox lightbox--active" onClick={() => setLightboxImg(null)}>
          <button className="lightbox__close" onClick={() => setLightboxImg(null)}>×</button>
          <img className="lightbox__img" src={lightboxImg.src} alt={t(lightboxImg.caption, lang)} />
        </div>
      )}
    </div>
  );
}
