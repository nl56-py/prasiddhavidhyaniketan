'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { content, t } from '@/lib/content';

export default function NoticeBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('pvn-notice-dismissed');
    if (dismissed) setVisible(false);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('pvn-notice-dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div className="notice-banner">
      <span className="notice-banner__text">{t(content.noticeBanner.text, lang)}</span>
      <Link href="/admissions" className="notice-banner__btn">
        {t(content.noticeBanner.button, lang)}
      </Link>
      <button className="notice-banner__close" onClick={dismiss} aria-label="Dismiss">×</button>
    </div>
  );
}
