import React from 'react';
import { Helmet } from 'react-helmet';
import { getLang } from '../i18n';
import '../styles/ContactUsPage.css';

const ContactUsPage = () => {
  const lang = getLang();

  const texts = {
    en: {
      title: 'Contact Us',
      subtitle: 'Scan the QR code below to contact us on LINE',
      lineTitle: 'LINE Official Account',
      lineDesc: 'Scan to follow us on LINE'
    },
    zh: {
      title: '联系我们',
      subtitle: '扫码下方二维码，通过LINE联系我们',
      lineTitle: 'LINE 官方账号',
      lineDesc: '扫码关注我们'
    }
  };

  const t = texts[lang] || texts['en'];

  return (
    <div className="contact-us-container container section">
      <Helmet>
        <title>{t.title} - Purrsona</title>
      </Helmet>
      <div className="contact-us-content">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        
        <div className="line-qr-section">
          <h3>{t.lineTitle}</h3>
          <div className="line-qr-container">
            <img src="/line-qr-code.jpg" alt="LINE QR Code" className="line-qr-image" />
          </div>
          <p className="line-qr-desc">{t.lineDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;