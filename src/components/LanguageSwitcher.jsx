import React, { useState, useEffect } from 'react';
import { getLang, setLang, languagesList } from '../i18n';
import '../styles/LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(getLang());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleLangChange = () => {
      setCurrentLang(getLang());
    };
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  const handleSelect = (langCode) => {
    setLang(langCode);
    setIsOpen(false);
    // 刷新页面以应用新语言
    window.location.reload();
  };

  const currentLangObj = languagesList.find(l => l.code === currentLang) || languagesList[0];

  return (
    <div className="language-switcher">
      <button 
        className="lang-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="lang-flag">{currentLangObj.flag}</span>
        <span className="lang-code">{currentLangObj.code.toUpperCase()}</span>
        <span className="lang-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="lang-dropdown">
          {languagesList.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}