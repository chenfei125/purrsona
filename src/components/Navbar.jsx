import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { getReports } from '../utils/reportStorage';
import { getLang } from '../i18n';
import '../styles/Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const lang = getLang();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // 获取报告数量
  const reportCount = getReports().length;

  const navTexts = {
    en: {
      home: 'Home',
      test: 'Take Test',
      about: 'About',
      reports: 'My Reports'
    },
    zh: {
      home: '首页',
      test: '开始测试',
      about: '关于',
      reports: '我的报告'
    },
    vi: {
      home: 'Trang chủ',
      test: 'Kiểm tra',
      about: 'Giới thiệu',
      reports: 'Báo cáo'
    },
    th: {
      home: 'หน้าแรก',
      test: 'ทดสอบ',
      about: 'เกี่ยวกับ',
      reports: 'รายงาน'
    },
    id: {
      home: 'Beranda',
      test: 'Tes',
      about: 'Tentang',
      reports: 'Laporan'
    }
  };

  const t = navTexts[lang] || navTexts['en'];

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Logo size="small" />
        </NavLink>
        <div className="menu-icon" onClick={handleClick}>
          {click ? '✕' : '☰'}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
              {t.home}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/test" className="nav-links" onClick={closeMobileMenu}>
              {t.test}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reports" className="nav-links nav-reports" onClick={closeMobileMenu}>
              {t.reports}
              {reportCount > 0 && <span className="report-badge">{reportCount}</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links" onClick={closeMobileMenu}>
              {t.about}
            </NavLink>
          </li>
          <li className="nav-item lang-nav-item">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
