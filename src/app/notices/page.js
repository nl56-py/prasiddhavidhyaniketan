'use client';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';
import { useScrollReveal } from '@/lib/useScrollReveal';

const sampleNotices = [
  { title: { en: 'Admission Open for New Academic Session', np: 'नयाँ शैक्षिक सत्रका लागि भर्ना खुला' }, excerpt: { en: 'Admissions are open for Nursery to Grade 8. Parents are requested to contact the school office for details.', np: 'नर्सरीदेखि कक्षा ८ सम्म भर्ना खुला गरिएको छ। थप जानकारीका लागि विद्यालय कार्यालयमा सम्पर्क गर्नुहोस्।' }, date: '2082/01/15' },
  { title: { en: 'Parent-Teacher Meeting Notice', np: 'अभिभावक-शिक्षक बैठक सूचना' }, excerpt: { en: 'Parents are invited to attend the upcoming meeting to discuss student progress and classroom performance.', np: 'विद्यार्थीको प्रगति र कक्षागत प्रदर्शनबारे छलफल गर्न अभिभावकहरूलाई बैठकमा आमन्त्रण गरिन्छ।' }, date: '2082/01/10' },
  { title: { en: 'Examination Schedule Published', np: 'परीक्षा तालिका प्रकाशित' }, excerpt: { en: 'The examination routine has been published. Students are advised to prepare according to the schedule.', np: 'परीक्षा तालिका प्रकाशित गरिएको छ। विद्यार्थीहरूलाई तालिका अनुसार तयारी गर्न अनुरोध गरिन्छ।' }, date: '2082/01/05' },
  { title: { en: 'Annual Sports Day Announcement', np: 'वार्षिक खेलकुद दिवस सूचना' }, excerpt: { en: 'Annual sports day will be held at the school premises. All students are expected to participate.', np: 'वार्षिक खेलकुद दिवस विद्यालय परिसरमा आयोजना हुनेछ। सबै विद्यार्थीको सहभागिता अपेक्षित छ।' }, date: '2081/12/25' },
  { title: { en: 'School Holiday Notice', np: 'विद्यालय बिदा सूचना' }, excerpt: { en: 'School will remain closed on the following dates for festivals. Regular classes will resume after the holiday.', np: 'पर्व-चाडका कारण निम्न मितिमा विद्यालय बन्द रहनेछ। बिदा पछि नियमित कक्षा सुरु हुनेछ।' }, date: '2081/12/20' },
  { title: { en: 'Science Exhibition Notification', np: 'विज्ञान प्रदर्शनी सूचना' }, excerpt: { en: 'Students of Grades 5-8 are invited to participate in the upcoming science exhibition.', np: 'कक्षा ५-८ का विद्यार्थीहरूलाई विज्ञान प्रदर्शनीमा सहभागिता गर्न आमन्त्रण गरिन्छ।' }, date: '2081/12/15' },
];

export default function NoticesPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();
  const c = content.home.noticesPreview;

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">{t(c.title, lang)}</h1>
          <p className="page-hero__subtitle">{t(c.subtitle, lang)}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="stagger reveal">
            {sampleNotices.map((notice, i) => (
              <div className="notice-card" key={i} style={{ marginBottom: 'var(--space-4)' }}>
                <span className="notice-card__date">{notice.date}</span>
                <h3 className="notice-card__title">{t(notice.title, lang)}</h3>
                <p className="notice-card__excerpt">{t(notice.excerpt, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
