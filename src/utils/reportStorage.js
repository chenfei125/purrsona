// 报告本地存储工具 - Purrsona
// 每份报告独立解锁，支持历史报告管理

const REPORTS_KEY = 'purrsona_reports';
const CURRENT_RESULT_ID_KEY = 'purrsona_current_result_id';

// 生成唯一报告ID
export const generateResultId = () => {
  return `result_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

// 获取所有报告
export const getReports = () => {
  try {
    const reports = localStorage.getItem(REPORTS_KEY);
    return reports ? JSON.parse(reports) : [];
  } catch (e) {
    console.error('Failed to get reports:', e);
    return [];
  }
};

// 保存所有报告
export const saveReports = (reports) => {
  try {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  } catch (e) {
    console.error('Failed to save reports:', e);
  }
};

// 添加新报告
export const addReport = (report) => {
  const reports = getReports();
  reports.unshift(report); // 最新报告放在最前面
  saveReports(reports);
  return report;
};

// 根据ID获取报告
export const getReportById = (resultId) => {
  const reports = getReports();
  return reports.find(report => report.resultId === resultId) || null;
};

// 解锁指定报告
export const unlockReport = (resultId) => {
  const reports = getReports();
  const updatedReports = reports.map(report =>
    report.resultId === resultId
      ? { ...report, unlocked: true }
      : report
  );
  saveReports(updatedReports);
  return updatedReports.find(report => report.resultId === resultId);
};

// 检查报告是否已解锁
export const isReportUnlocked = (resultId) => {
  const report = getReportById(resultId);
  return report?.unlocked || false;
};

// 设置当前查看的报告ID
export const setCurrentResultId = (resultId) => {
  localStorage.setItem(CURRENT_RESULT_ID_KEY, resultId);
};

// 获取当前查看的报告ID
export const getCurrentResultId = () => {
  return localStorage.getItem(CURRENT_RESULT_ID_KEY);
};

// 获取当前报告
export const getCurrentReport = () => {
  const resultId = getCurrentResultId();
  return resultId ? getReportById(resultId) : null;
};

// 删除报告
export const deleteReport = (resultId) => {
  const reports = getReports();
  const filteredReports = reports.filter(report => report.resultId !== resultId);
  saveReports(filteredReports);
};

// 清空所有报告（谨慎使用）
export const clearAllReports = () => {
  localStorage.removeItem(REPORTS_KEY);
  localStorage.removeItem(CURRENT_RESULT_ID_KEY);
};

// 创建报告对象
export const createReport = (catType, resultData, catName) => {
  return {
    resultId: generateResultId(),
    catType,
    catName,
    createdAt: new Date().toISOString(),
    unlocked: false,
    resultData
  };
};
