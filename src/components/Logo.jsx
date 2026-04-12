import React from 'react';
import './Logo.css';

const Logo = ({ size = 'normal', showText = true }) => {
  const sizeClass = `logo-${size}`;
  
  return (
    <div className={`purrsona-logo ${sizeClass}`}>
      <svg viewBox="0 0 48 48" className="logo-icon" xmlns="http://www.w3.org/2000/svg">
        {/* 猫头轮廓 */}
        <circle cx="24" cy="28" r="18" fill="url(#gradient)" />
        
        {/* 左猫耳 */}
        <path d="M8 12 L14 24 L6 24 Z" fill="url(#gradient)" />
        
        {/* 右猫耳 */}
        <path d="M40 12 L34 24 L42 24 Z" fill="url(#gradient)" />
        
        {/* 左眼 */}
        <ellipse cx="17" cy="26" rx="4" ry="5" fill="#fff" />
        <circle cx="17" cy="26" r="2" fill="#1a1a2e" />
        
        {/* 右眼 */}
        <ellipse cx="31" cy="26" rx="4" ry="5" fill="#fff" />
        <circle cx="31" cy="26" r="2" fill="#1a1a2e" />
        
        {/* 鼻子 */}
        <path d="M22 33 L26 33 L24 36 Z" fill="#ff9f9f" />
        
        {/* 嘴巴 */}
        <path d="M20 38 Q24 42 28 38" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* 中线 - 表达"人格分析" */}
        <line x1="24" y1="10" x2="24" y2="46" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
        
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <span className="logo-text">
          <span className="logo-text-main">Purrsona</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
