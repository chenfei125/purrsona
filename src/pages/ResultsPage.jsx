import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getLang } from '../i18n';
import { getCurrentReport, unlockReport, getCurrentResultId } from '../utils/reportStorage';
import StripePayment from '../components/StripePayment';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const [currentReport, setCurrentReport] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockSuccess, setUnlockSuccess] = useState(false);
  const [, setUpdate] = useState(0);
  const lang = getLang();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  // 加载当前报告
  useEffect(() => {
    const loadReport = () => {
      const report = getCurrentReport();
      if (report) {
        setCurrentReport(report);
        setIsUnlocked(report.unlocked || false);
      }
    };
    loadReport();

    const handleLangChange = () => setUpdate(prev => prev + 1);
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  // 获取翻译文本
  const getText = (obj) => {
    if (!obj) return '';
    return obj[lang] || obj['en'] || '';
  };

  // PayPal 支付成功回调
  const handlePayPalSuccess = () => {
    // 重新从 localStorage 读取最新状态
    const resultId = getCurrentResultId();
    if (resultId) {
      const report = getCurrentReport();
      setCurrentReport(report);
      setIsUnlocked(true);
      setUnlockSuccess(true);
      setTimeout(() => setUnlockSuccess(false), 4000);
    }
  };

  // Stripe 支付成功验证
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');

    if (payment === 'success' && sessionId) {
      // 验证 Stripe session
      fetch(`${API_BASE_URL}/api/stripe/verify-session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.paid) {
            // 解锁报告
            unlockReport(data.resultId);
            // 重新加载报告
            const report = getCurrentReport();
            setCurrentReport(report);
            setIsUnlocked(true);
            setUnlockSuccess(true);
            setTimeout(() => setUnlockSuccess(false), 4000);
            // 清除 URL 参数
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        })
        .catch(err => console.error('Stripe verification error:', err));
    }
  }, [API_BASE_URL]);

  // 类型名称翻译
  const getTypeName = (catType) => {
    const typeNames = {
      independent: { en: 'Independent Cat 🐱', zh: '高冷独立型 🐱' },
      affectionate: { en: 'Affectionate Cat 🐈', zh: '粘人型 🐈' },
      social: { en: 'Social Butterfly Cat 🦁', zh: '社牛型 🦁' },
      aggressive: { en: 'Feisty Cat 😾', zh: '暴躁型 😾' },
    };
    return typeNames[catType]?.[lang] || typeNames[catType]?.['en'] || catType;
  };

  // 没有报告的情况
  if (!currentReport) {
    return (
      <div className="results-page">
        <div className="results-container">
          <div className="results-card">
            <h2>{lang === 'zh' ? '没有找到报告' : 'No Report Found'}</h2>
            <p>{lang === 'zh' ? '请先完成测试' : 'Please take the test first.'}</p>
            <Link to="/test" className="btn btn-primary">
              {lang === 'zh' ? '开始测试' : 'Start Test'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { resultData, catName, createdAt, resultId } = currentReport;
  const summary = getText(resultData.summary);
  const strengths = resultData.strengths?.[lang] || resultData.strengths?.['en'] || [];
  const weaknessesPreview = getText(resultData.weaknessesPreview);
  const relationships = getText(resultData.relationships);
  const behavior = getText(resultData.behavior);
  const emotion = getText(resultData.emotion);
  const advice = getText(resultData.advice);
  const typeName = getTypeName(currentReport.catType);
  const emoji = resultData.emoji;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  return (
    <div className="results-page">
      <Helmet>
        <title>{typeName} - Purrsona</title>
      </Helmet>

      {/* Header */}
      <div className="results-header">
        <div className="container">
          <div className="report-unique-badge">
            {lang === 'zh'
              ? '这是一份基于你本次测试答案生成的个性化报告'
              : 'This is a personalized report based on your latest test answers.'}
          </div>
          <div className="result-badge">{lang === 'zh' ? '性格报告' : 'Personality Report'}</div>
          <div className="cat-emoji-result">{emoji}</div>
          <h1 className="result-type">{typeName}</h1>
          <p className="cat-name-display">
            {lang === 'zh' ? `${catName}的性格分析` : `${catName}'s Personality Analysis`}
          </p>
          <p className="report-date">{formatDate(createdAt)}</p>
        </div>
      </div>

      {/* 解锁成功提示 */}
      {unlockSuccess && (
        <div className="unlock-success-toast">
          <span>🎉</span>
          {lang === 'zh' ? '当前测试的完整报告已解锁！' : 'Full report unlocked for this test!'}
        </div>
      )}

      <div className="results-content container">

        {/* === 免费模块 === */}

        {/* Module 1: Type */}
        <div className="report-module module-free">
          <div className="module-header">
            <span className="module-icon">🎯</span>
            <h2>{lang === 'zh' ? '性格类型' : 'Personality Type'}</h2>
          </div>
          <div className="module-body">
            <p className="module-text type-name">{typeName}</p>
          </div>
        </div>

        {/* Module 2: Summary */}
        <div className="report-module module-free">
          <div className="module-header">
            <span className="module-icon">📋</span>
            <h2>{lang === 'zh' ? '性格概述' : 'Personality Overview'}</h2>
          </div>
          <div className="module-body">
            <p className="module-text">{summary}</p>
          </div>
        </div>

        {/* Module 3: Strengths */}
        <div className="report-module module-free">
          <div className="module-header">
            <span className="module-icon">💪</span>
            <h2>{lang === 'zh' ? '性格优点' : 'Key Strengths'}</h2>
          </div>
          <div className="module-body">
            <ul className="strengths-list">
              {strengths.map((s, i) => (
                <li key={i} className="strength-item">
                  <span className="check-icon">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Module 4: Weaknesses Preview */}
        <div className="report-module module-free module-hook">
          <div className="module-header">
            <span className="module-icon">⚠️</span>
            <h2>{lang === 'zh' ? '成长空间' : 'Areas for Growth'}</h2>
          </div>
          <div className="module-body">
            <p className="preview-text">{weaknessesPreview}</p>
            <p className="unlock-hint">
              🔓 {lang === 'zh' ? '解锁完整报告查看详细分析...' : 'Unlock the full report for complete analysis...'}
            </p>
          </div>
        </div>

        {/* === 付费墙 === */}
        {!isUnlocked && (
          <div className="paywall-module">
            <div className="paywall-content">
              <div className="paywall-header">
                <span className="lock-icon">🔒</span>
                <h2>{lang === 'zh' ? '解锁完整报告' : 'Unlock Full Cat Report'}</h2>
                <p className="paywall-subtitle">
                  {lang === 'zh'
                    ? '发现猫咪的情绪模式、信任程度、隐藏行为触发点，以及个性化相处建议。'
                    : "Discover your cat's emotional patterns, trust level, hidden behavior triggers, and personalized bonding advice."}
                </p>
              </div>

              <div className="paywall-modules-list">
                <div className="paywall-module-item unlocked">✅ {lang === 'zh' ? '性格类型' : 'Personality Type'}</div>
                <div className="paywall-module-item unlocked">✅ {lang === 'zh' ? '性格概述' : 'Personality Overview'}</div>
                <div className="paywall-module-item unlocked">✅ {lang === 'zh' ? '性格优点' : 'Key Strengths'}</div>
                <div className="paywall-module-item unlocked">✅ {lang === 'zh' ? '成长空间(预览)' : 'Areas for Growth (Preview)'}</div>
                <div className="paywall-module-item locked">🔒 {lang === 'zh' ? '关系动态' : 'Relationship Dynamics'}</div>
                <div className="paywall-module-item locked">🔒 {lang === 'zh' ? '行为模式分析' : 'Behavior Pattern Analysis'}</div>
                <div className="paywall-module-item locked">🔒 {lang === 'zh' ? '情绪状态解读' : 'Emotional State Analysis'}</div>
                <div className="paywall-module-item locked">🔒 {lang === 'zh' ? '个性化建议' : 'Personalized Advice'}</div>
              </div>

              <div className="paywall-pricing">
                <span className="original-price">$9.99</span>
                <span className="sale-price">$1.99</span>
                <span className="discount-tag">80% OFF</span>
              </div>

              {/* Stripe 支付 */}
              <div style={{ margin: '20px 0 20px' }}>
                <StripePayment resultId={resultId} onSuccess={handlePayPalSuccess} />
              </div>

              {/* 解锁范围说明 */}
              <p className="unlock-scope-note">
                {lang === 'zh'
                  ? '本次解锁仅适用于当前这份报告。每次重新测试都会生成新的个性化报告。'
                  : 'This unlock applies only to this report. Each new test creates a new personalized report.'}
              </p>
            </div>
          </div>
        )}

        {/* === 付费模块（解锁后显示） === */}
        {isUnlocked && (
          <div className="premium-modules">
            <div className="unlocked-banner">
              <span className="unlock-icon">🎉</span>
              <span>{lang === 'zh' ? '完整报告已解锁！' : 'Full Report Unlocked!'}</span>
            </div>

            {/* Module 5: Relationships */}
            <div className="report-module module-premium">
              <div className="module-header">
                <span className="module-icon">❤️</span>
                <h2>{lang === 'zh' ? '关系动态' : 'Relationship Dynamics'}</h2>
              </div>
              <div className="module-body">
                <p className="module-text">{relationships}</p>
              </div>
            </div>

            {/* Module 6: Behavior */}
            <div className="report-module module-premium">
              <div className="module-header">
                <span className="module-icon">🔬</span>
                <h2>{lang === 'zh' ? '行为模式分析' : 'Behavior Pattern Analysis'}</h2>
              </div>
              <div className="module-body">
                <p className="module-text">{behavior}</p>
              </div>
            </div>

            {/* Module 7: Emotion */}
            <div className="report-module module-premium">
              <div className="module-header">
                <span className="module-icon">💭</span>
                <h2>{lang === 'zh' ? '情绪状态解读' : 'Emotional State Analysis'}</h2>
              </div>
              <div className="module-body">
                <p className="module-text">{emotion}</p>
              </div>
            </div>

            {/* Module 8: Advice */}
            <div className="report-module module-premium">
              <div className="module-header">
                <span className="module-icon">🎯</span>
                <h2>{lang === 'zh' ? '个性化建议' : 'Personalized Advice'}</h2>
              </div>
              <div className="module-body">
                <p className="module-text">{advice}</p>
              </div>
            </div>

            {/* Bonus */}
            <div className="bonus-section">
              <h3 className="bonus-title">{lang === 'zh' ? '🎁 额外内容' : '🎁 Bonus Content'}</h3>
              <div className="bonus-grid">
                <div className="bonus-card">
                  <span className="bonus-icon">🎾</span>
                  <h4>{lang === 'zh' ? '推荐玩具' : 'Recommended Toys'}</h4>
                  <p>{lang === 'zh' ? '根据你猫的性格，推荐互动益智玩具和独立玩耍玩具。' : 'Based on personality, interactive puzzle toys and solo play items are recommended.'}</p>
                </div>
                <div className="bonus-card">
                  <span className="bonus-icon">🍽️</span>
                  <h4>{lang === 'zh' ? '饮食建议' : 'Diet Tips'}</h4>
                  <p>{lang === 'zh' ? '高质量蛋白质饮食，固定喂食时间效果最佳。' : 'High-quality protein diet with consistent feeding schedule works best.'}</p>
                </div>
                <div className="bonus-card">
                  <span className="bonus-icon">❤️</span>
                  <h4>{lang === 'zh' ? '最佳伴侣' : 'Best Match'}</h4>
                  <p>{lang === 'zh' ? '这种性格适合与独立型或性格平和的猫相处。' : 'This personality pairs well with independent or calm cats.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="results-actions">
          <Link to="/test" className="btn btn-secondary">
            {lang === 'zh' ? '← 再测一次' : '← Test Again'}
          </Link>
          <Link to="/reports" className="btn btn-secondary">
            {lang === 'zh' ? '📋 我的报告' : '📋 My Reports'}
          </Link>
          <Link to="/" className="btn btn-primary">
            {lang === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>

        {/* 重新测试提醒 */}
        <div className="retake-notice">
          <span className="retake-icon">ℹ️</span>
          {lang === 'zh'
            ? '重新测试后将生成一份新的报告。'
            : 'Retaking the test will generate a new report.'}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
