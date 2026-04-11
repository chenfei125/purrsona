import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { getLang } from '../i18n';
import { getReports, setCurrentResultId, deleteReport } from '../utils/reportStorage';
import '../styles/ReportHistoryPage.css';

const ReportHistoryPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [, setUpdate] = useState(0);
  const lang = getLang();

  // 加载报告列表
  useEffect(() => {
    const loadReports = () => {
      const allReports = getReports();
      setReports(allReports);
    };
    
    loadReports();
    
    // 监听语言变化
    const handleLangChange = () => setUpdate(prev => prev + 1);
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  // 查看报告详情
  const handleViewReport = (resultId) => {
    setCurrentResultId(resultId);
    navigate('/results');
  };

  // 删除报告
  const handleDeleteReport = (resultId, e) => {
    e.stopPropagation();
    if (window.confirm(lang === 'zh' ? '确定要删除这份报告吗？' : 'Are you sure you want to delete this report?')) {
      deleteReport(resultId);
      setReports(getReports());
    }
  };

  // 格式化时间
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 获取类型名称（根据语言）
  const getTypeName = (report) => {
    const typeNames = {
      independent: { en: 'Independent Cat 🐱', zh: '高冷独立型 🐱', vi: 'Mèo độc lập 🐱', th: 'แมวอิสระ 🐱', id: 'Kucing mandiri 🐱' },
      affectionate: { en: 'Affectionate Cat 🐈', zh: '粘人型 🐈', vi: 'Mèo tình cảm 🐈', th: 'แมวรักสนิท 🐈', id: 'Kucing penuh kasih 🐈' },
      social: { en: 'Social Butterfly Cat 🦁', zh: '社牛型 🦁', vi: 'Mèo xã hội 🦁', th: 'แมวผีเสื้อสังคม 🦁', id: 'Kucing sosial 🦁' },
      aggressive: { en: 'Feisty Cat 😾', zh: '暴躁型 😾', vi: 'Mèo nóng tính 😾', th: 'แมวดื้อรั้น 😾', id: 'Kucing agresif 😾' }
    };
    
    const type = report.catType;
    return typeNames[type]?.[lang] || typeNames[type]?.['en'] || report.resultData?.type || 'Unknown';
  };

  // 获取摘要预览
  const getSummaryPreview = (report) => {
    const summary = report.resultData?.summary?.[lang] || report.resultData?.summary?.['en'] || '';
    return summary.slice(0, 80) + (summary.length > 80 ? '...' : '');
  };

  // 多语言文本
  const texts = {
    en: {
      title: 'My Reports',
      subtitle: 'View your past personality test results',
      noReports: 'No reports yet',
      noReportsDesc: 'Take the test to generate your first report',
      startTest: 'Start Test',
      unlocked: 'Unlocked',
      locked: 'Locked',
      viewReport: 'View Report',
      delete: 'Delete',
      catName: 'Cat',
      testDate: 'Test Date'
    },
    zh: {
      title: '我的报告',
      subtitle: '查看你过去的性格测试结果',
      noReports: '暂无报告',
      noReportsDesc: '完成测试生成你的第一份报告',
      startTest: '开始测试',
      unlocked: '已解锁',
      locked: '未解锁',
      viewReport: '查看报告',
      delete: '删除',
      catName: '猫咪',
      testDate: '测试时间'
    },
    vi: {
      title: 'Báo cáo của tôi',
      subtitle: 'Xem kết quả kiểm tra tính cách trước đây',
      noReports: 'Chưa có báo cáo',
      noReportsDesc: 'Làm bài kiểm tra để tạo báo cáo đầu tiên',
      startTest: 'Bắt đầu',
      unlocked: 'Đã mở khóa',
      locked: 'Chưa mở khóa',
      viewReport: 'Xem báo cáo',
      delete: 'Xóa',
      catName: 'Mèo',
      testDate: 'Thở gian'
    },
    th: {
      title: 'รายงานของฉัน',
      subtitle: 'ดูผลการทดสอบบุคลิกภาพที่ผ่านมา',
      noReports: 'ยังไม่มีรายงาน',
      noReportsDesc: 'ทำแบบทดสอบเพื่อสร้างรายงานแรก',
      startTest: 'เริ่มทดสอบ',
      unlocked: 'ปลดล็อกแล้ว',
      locked: 'ยังไม่ปลดล็อก',
      viewReport: 'ดูรายงาน',
      delete: 'ลบ',
      catName: 'แมว',
      testDate: 'เวลาทดสอบ'
    },
    id: {
      title: 'Laporan Saya',
      subtitle: 'Lihat hasil tes kepribadian sebelumnya',
      noReports: 'Belum ada laporan',
      noReportsDesc: 'Ikuti tes untuk membuat laporan pertama',
      startTest: 'Mulai Tes',
      unlocked: 'Terbuka',
      locked: 'Terkunci',
      viewReport: 'Lihat Laporan',
      delete: 'Hapus',
      catName: 'Kucing',
      testDate: 'Waktu Tes'
    }
  };

  const t = texts[lang] || texts['en'];

  return (
    <div className="report-history-page">
      <Helmet>
        <title>{t.title} - Purrsona</title>
      </Helmet>

      {/* Header */}
      <div className="history-header">
        <div className="container">
          <h1 className="history-title">{t.title}</h1>
          <p className="history-subtitle">{t.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="history-content container">
        {reports.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h2>{t.noReports}</h2>
            <p>{t.noReportsDesc}</p>
            <Link to="/test" className="btn btn-primary">
              {t.startTest}
            </Link>
          </div>
        ) : (
          <div className="reports-grid">
            {reports.map((report) => (
              <div 
                key={report.resultId} 
                className={`report-card ${report.unlocked ? 'unlocked' : 'locked'}`}
                onClick={() => handleViewReport(report.resultId)}
              >
                {/* 状态标签 */}
                <div className={`status-badge ${report.unlocked ? 'status-unlocked' : 'status-locked'}`}>
                  {report.unlocked ? (
                    <>
                      <span className="status-icon">🔓</span>
                      {t.unlocked}
                    </>
                  ) : (
                    <>
                      <span className="status-icon">🔒</span>
                      {t.locked}
                    </>
                  )}
                </div>

                {/* 猫类型 */}
                <div className="report-type">
                  <span className="type-emoji">{report.resultData?.emoji || '🐱'}</span>
                  <h3 className="type-name">{getTypeName(report)}</h3>
                </div>

                {/* 猫咪名字 */}
                <div className="report-cat-name">
                  <span className="label">{t.catName}:</span>
                  <span className="value">{report.catName}</span>
                </div>

                {/* 摘要预览 */}
                <p className="report-preview">{getSummaryPreview(report)}</p>

                {/* 测试时间 */}
                <div className="report-meta">
                  <span className="meta-label">{t.testDate}:</span>
                  <span className="meta-value">{formatDate(report.createdAt)}</span>
                </div>

                {/* 操作按钮 */}
                <div className="report-actions">
                  <button className="btn btn-view" onClick={(e) => {
                    e.stopPropagation();
                    handleViewReport(report.resultId);
                  }}>
                    {t.viewReport}
                  </button>
                  <button 
                    className="btn btn-delete" 
                    onClick={(e) => handleDeleteReport(report.resultId, e)}
                    title={t.delete}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 底部操作 */}
        {reports.length > 0 && (
          <div className="history-footer">
            <Link to="/test" className="btn btn-primary">
              {t.startTest}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHistoryPage;
