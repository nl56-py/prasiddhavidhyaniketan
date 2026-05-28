'use client';
import { useLanguage } from '@/lib/language-context';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function BlogPage() {
  const { lang } = useLanguage();
  const ref = useScrollReveal();

  const posts = [
    { title: { en: 'Why Value-Based Education Matters', np: 'संस्कारयुक्त शिक्षा किन महत्वपूर्ण छ' }, excerpt: { en: 'Education should shape not only academic success but also moral values, discipline, and social responsibility.', np: 'शिक्षाले केवल शैक्षिक सफलता मात्र होइन, नैतिक मूल्य, अनुशासन र सामाजिक जिम्मेवारी पनि विकास गर्नुपर्छ।' }, date: '2082/01/10', image: '/images/teacher teaching.jpeg' },
    { title: { en: 'The Importance of Early Childhood Education', np: 'बाल्यकालीन शिक्षाको महत्व' }, excerpt: { en: 'The early years of education lay the foundation for lifelong learning and personal growth.', np: 'शिक्षाका प्रारम्भिक वर्षहरूले जीवनभर सिकाइ र व्यक्तिगत विकासको आधार तयार गर्छन्।' }, date: '2082/01/05', image: '/images/kids in class.jpeg' },
    { title: { en: 'Building Confidence Through Activities', np: 'क्रियाकलापमार्फत आत्मविश्वास निर्माण' }, excerpt: { en: 'Extracurricular activities play a vital role in building confidence, teamwork, and leadership skills.', np: 'पाठ्यक्रम बाहिरका क्रियाकलापहरूले आत्मविश्वास, सहकार्य र नेतृत्व सीपमा महत्वपूर्ण भूमिका खेल्छन्।' }, date: '2081/12/28', image: '/images/cultural dress 2.jpeg' },
  ];

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">{lang === 'np' ? 'ब्लग' : 'Blog'}</h1>
          <p className="page-hero__subtitle">{lang === 'np' ? 'शिक्षा, विकास र विद्यालय जीवनबारे लेखहरू' : 'Articles about education, development, and school life'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3 stagger reveal">
            {posts.map((post, i) => (
              <div className="card" key={i} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-dark)', fontWeight: 600 }}>{post.date}</span>
                  <h3 className="card__title" style={{ margin: 'var(--space-2) 0' }}>{lang === 'np' ? post.title.np : post.title.en}</h3>
                  <p className="card__desc">{lang === 'np' ? post.excerpt.np : post.excerpt.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
