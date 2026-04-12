import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/LandingPage.css';
import { Link } from 'react-router-dom';
import { FaPaw, FaHeart, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import Logo from '../components/Logo';
import { t, getLang } from '../i18n';

const LandingPage = () => {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const handleLangChange = () => setUpdate(prev => prev + 1);
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  const lang = getLang();

  return (
    <div className="landing-page purrsona-landing">
      <Helmet>
        <title>Purrsona - Cat Personality Test</title>
        <meta name="description" content="Discover your cat's hidden personality, emotions, and behavior patterns through a fun and insightful test." />
      </Helmet>
      
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <Logo size="large" />
          </div>
          
          <h1 className="hero-title">
            {lang === 'zh' ? '你家的猫是什么性格？' : 'What Type of Cat Do You Have?'}
          </h1>
          
          <p className="hero-subtitle">
            {lang === 'zh' 
              ? '发现猫咪隐藏的性格、情绪状态和行为模式。' 
              : "Discover your cat's hidden personality, emotions, and behavior patterns."}
          </p>
          
          <div className="hero-cta">
            <Link to="/test" className="btn btn-primary btn-hero">
              <FaPaw className="btn-icon" />
              {lang === 'zh' ? '开始测试' : 'Start Test'}
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">{lang === 'zh' ? '猫咪已测试' : 'Cats Tested'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">{lang === 'zh' ? '性格类型' : 'Personality Types'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">{lang === 'zh' ? '分析模块' : 'Analysis Modules'}</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="cat-illustration">
            <div className="cat-silhouette">🐱</div>
          </div>
        </div>
      </header>

      {/* How It Works */}
      <section className="section how-it-works-section">
        <div className="container">
          <h2 className="section-title">
            {lang === 'zh' ? '工作原理' : 'How It Works'}
          </h2>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon"><FaPaw /></div>
              <h3>{lang === 'zh' ? '回答问题' : 'Answer Questions'}</h3>
              <p>{lang === 'zh' ? '根据你对猫的观察回答12道问题' : 'Answer 12 questions about your cat\'s behavior'}</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon"><FaChartLine /></div>
              <h3>{lang === 'zh' ? '获取分析' : 'Get Analysis'}</h3>
              <p>{lang === 'zh' ? 'AI分析你猫的性格类型' : 'AI analyzes your cat\'s personality type'}</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon"><FaHeart /></div>
              <h3>{lang === 'zh' ? '深度报告' : 'Deep Report'}</h3>
              <p>{lang === 'zh' ? '了解情绪、行为和相处建议' : 'Understand emotions, behavior, and bonding tips'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">
            {lang === 'zh' ? '你将了解到' : 'What You\'ll Learn'}
          </h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>{lang === 'zh' ? '性格类型' : 'Personality Type'}</h3>
              <p>{lang === 'zh' ? '了解猫是高冷型、粘人型还是社牛型' : 'Is your cat independent, affectionate, or social?'}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💭</div>
              <h3>{lang === 'zh' ? '情绪状态' : 'Emotional State'}</h3>
              <p>{lang === 'zh' ? '解读猫的真实情绪和信任程度' : 'Decode your cat\'s true emotions and trust level'}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>{lang === 'zh' ? '行为模式' : 'Behavior Patterns'}</h3>
              <p>{lang === 'zh' ? '理解它为什么咬人、躲藏或粘人' : 'Understand why it bites, hides, or clings'}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>{lang === 'zh' ? '相处建议' : 'Bonding Tips'}</h3>
              <p>{lang === 'zh' ? '个性化的改善关系策略' : 'Personalized strategies to improve your relationship'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <span>{lang === 'zh' ? '隐私保护' : 'Privacy Protected'}</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span>{lang === 'zh' ? '即时结果' : 'Instant Results'}</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>{lang === 'zh' ? '科学方法' : 'Science-Based'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2 className="cta-title">
            {lang === 'zh' ? '准备好了解你的猫了吗？' : 'Ready to Understand Your Cat?'}
          </h2>
          <p className="cta-subtitle">
            {lang === 'zh' ? '只需3分钟，获得深度性格分析报告' : 'Just 3 minutes for a comprehensive personality report'}
          </p>
          <Link to="/test" className="btn btn-primary btn-hero">
            <FaPaw className="btn-icon" />
            {lang === 'zh' ? '开始测试' : 'Start Test'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="purrsona-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Logo size="small" />
              <p className="footer-tagline">
                {lang === 'zh' 
                  ? '一个猫性格测试与情绪分析网站' 
                  : 'A cat personality test and emotional insight website'}
              </p>
            </div>
            
            <div className="footer-links">
              <Link to="/about">{lang === 'zh' ? '关于我们' : 'About'}</Link>
              <Link to="/contact">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
              <Link to="/terms">{lang === 'zh' ? '服务条款' : 'Terms of Service'}</Link>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Purrsona. {lang === 'zh' ? '保留所有权利' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
