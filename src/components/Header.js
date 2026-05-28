'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const nav = content.nav[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <Link href="/" className="header__logo" onClick={closeMenu}>
          <img src="/logo.png" alt="PVN Logo" width={48} height={48} />
          <div className="header__logo-text">
            <span className="header__logo-name">{t(content.school.name, lang)}</span>
            <span className="header__logo-tagline">{t(content.school.commitment, lang)}</span>
          </div>
        </Link>

        <nav className={`nav ${mobileOpen ? 'nav--open' : ''}`}>
          <div className="nav__item">
            <Link href="/" className="nav__link" onClick={closeMenu}>{nav.home}</Link>
          </div>

          {/* About Dropdown */}
          <div className={`nav__item ${openDropdown === 'about' ? 'nav__item--open' : ''}`}>
            <button className="nav__link" onClick={() => toggleDropdown('about')}>
              {nav.about}
              <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
            </button>
            <div className="nav__dropdown">
              <Link href="/about" className="nav__dropdown-link" onClick={closeMenu}>{nav.about}</Link>
              <Link href="/history" className="nav__dropdown-link" onClick={closeMenu}>{nav.ourHistory}</Link>
              <Link href="/mission-vision" className="nav__dropdown-link" onClick={closeMenu}>{nav.missionVision}</Link>
              <Link href="/principal-message" className="nav__dropdown-link" onClick={closeMenu}>{nav.principalMessage}</Link>
              <Link href="/manager-message" className="nav__dropdown-link" onClick={closeMenu}>{nav.managerMessage}</Link>
            </div>
          </div>

          {/* Academics Dropdown */}
          <div className={`nav__item ${openDropdown === 'academics' ? 'nav__item--open' : ''}`}>
            <button className="nav__link" onClick={() => toggleDropdown('academics')}>
              {nav.academics}
              <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
            </button>
            <div className="nav__dropdown">
              <Link href="/academics" className="nav__dropdown-link" onClick={closeMenu}>{nav.academics}</Link>
              <Link href="/academics#nursery" className="nav__dropdown-link" onClick={closeMenu}>{nav.nursery}</Link>
              <Link href="/academics#primary" className="nav__dropdown-link" onClick={closeMenu}>{nav.primary}</Link>
              <Link href="/academics#middle" className="nav__dropdown-link" onClick={closeMenu}>{nav.middle}</Link>
            </div>
          </div>

          <div className="nav__item">
            <Link href="/facilities" className="nav__link" onClick={closeMenu}>{nav.facilities}</Link>
          </div>
          <div className="nav__item">
            <Link href="/gallery" className="nav__link" onClick={closeMenu}>{nav.gallery}</Link>
          </div>
          <div className="nav__item">
            <Link href="/notices" className="nav__link" onClick={closeMenu}>{nav.notices}</Link>
          </div>
          <div className="nav__item">
            <Link href="/contact" className="nav__link" onClick={closeMenu}>{nav.contact}</Link>
          </div>

          {/* Language Toggle */}
          <div className="lang-toggle">
            <button
              className={`lang-toggle__btn ${lang === 'en' ? 'lang-toggle__btn--active' : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
            <button
              className={`lang-toggle__btn ${lang === 'np' ? 'lang-toggle__btn--active' : ''}`}
              onClick={() => setLang('np')}
            >नेपाली</button>
          </div>

          <Link href="/admissions" className="nav__apply" onClick={closeMenu}>
            {nav.applyNow}
          </Link>
        </nav>

        <button
          className={`mobile-toggle ${mobileOpen ? 'mobile-toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {mobileOpen && <div className="mobile-overlay mobile-overlay--active" onClick={closeMenu}></div>}
    </header>
  );
}
