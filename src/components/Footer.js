'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';

export default function Footer() {
  const { lang } = useLanguage();
  const nav = content.nav[lang];
  const footer = content.footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/logo.png" alt="PVN Logo" width={48} height={48} />
              <span className="footer__logo-name">{t(content.school.name, lang)}</span>
            </div>
            <p className="footer__desc">{t(footer.description, lang)}</p>
            <p className="footer__desc" style={{ fontWeight: 600, color: 'var(--color-accent)', fontStyle: 'italic' }}>
              {t(content.school.motto, lang)}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__heading">{t(footer.quickLinks, lang)}</h4>
            <div className="footer__links">
              <Link href="/about" className="footer__link">→ {nav.about}</Link>
              <Link href="/history" className="footer__link">→ {nav.ourHistory}</Link>
              <Link href="/mission-vision" className="footer__link">→ {nav.missionVision}</Link>
              <Link href="/facilities" className="footer__link">→ {nav.facilities}</Link>
              <Link href="/gallery" className="footer__link">→ {nav.gallery}</Link>
              <Link href="/notices" className="footer__link">→ {nav.notices}</Link>
              <Link href="/contact" className="footer__link">→ {nav.contact}</Link>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="footer__heading">{t(footer.programs, lang)}</h4>
            <div className="footer__links">
              <Link href="/academics#nursery" className="footer__link">→ {nav.nursery}</Link>
              <Link href="/academics#primary" className="footer__link">→ {nav.primary}</Link>
              <Link href="/academics#middle" className="footer__link">→ {nav.middle}</Link>
              <Link href="/admissions" className="footer__link">→ {nav.admissions}</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer__heading">{t(footer.contactInfo, lang)}</h4>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📍</span>
              <span>{t(content.school.location, lang)}</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📞</span>
              <span>{content.school.mainPhone}</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">👤</span>
              <span>{t(content.school.manager, lang)}: {content.school.managerPhone}</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">👨‍🏫</span>
              <span>{t(content.school.principal, lang)}: {content.school.principalPhone}</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">🌐</span>
              <span>{content.school.website}</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{t(footer.copyright, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
