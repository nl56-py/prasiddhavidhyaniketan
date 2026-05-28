'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('pvn-lang');
    if (saved === 'np' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('pvn-lang', l);
    document.documentElement.setAttribute('lang', l === 'np' ? 'ne' : 'en');
  };

  const toggle = () => setLang(lang === 'en' ? 'np' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
