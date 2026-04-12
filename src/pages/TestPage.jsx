import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { getQuestions, answerOptions, getAnswerText } from '../data/questions';
import { getLang } from '../i18n';
import { createReport, addReport, setCurrentResultId } from '../utils/reportStorage';
import { calculateCatPersonality } from '../data/catPersonalityTypes';
import '../styles/TestPage.css';

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [name, setName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [, setUpdate] = useState(0);
  const navigate = useNavigate();

  // 获取当前语言
  const lang = getLang();
  
  // 获取当前语言的题目
  const questions = getQuestions(lang);
  
  // 初始化答案数组
  useEffect(() => {
    if (answers.length !== questions.length) {
      setAnswers(Array(questions.length).fill(null));
    }
  }, [questions.length]);

  useEffect(() => {
    const handleLangChange = () => setUpdate(prev => prev + 1);
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // 完成测试，生成报告
      finishTest(newAnswers);
    }
  };

  const finishTest = (finalAnswers) => {
    // 计算结果
    const result = calculateCatPersonality(finalAnswers, questions);
    if (!result) {
      navigate('/');
      return;
    }

    // 构建完整的 resultData 对象
    const resultData = {
      type: result.name,
      summary: result.summary,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      weaknessesPreview: result.weaknessesPreview,
      relationships: result.relationships,
      behavior: result.behavior,
      emotion: result.emotion,
      advice: result.advice,
      emoji: result.emoji,
      code: result.code
    };

    // 创建新报告对象
    const newReport = createReport(result.code, resultData, name.trim() || 'Your Cat');
    
    // 保存到本地存储
    addReport(newReport);
    setCurrentResultId(newReport.resultId);
    
    // 跳转到结果页
    navigate('/results');
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 多语言猫咪名字建议
  const catNamesByLang = {
    en: ["Luna", "Milo", "Bella", "Oliver", "Charlie", "Lucy", "Max", "Cleo", "Simba", "Nala"],
    zh: ["小煤球", "咪咪", "团子", "小橘", "花花", "布丁", "汤圆", "年糕", "包子", "饺子"],
    vi: ["Mèo Mun", "Mèo Vàng", "Bông", "Miu Miu", "Kitty", "Luna", "Milo"],
    th: ["โมจิ", "บัวลอย", "หมวย", "ตุ๊กตา", "แมวน้อย", "Luna", "Milo"],
    id: ["Mochi", "Oreo", "Coco", "Bella", "Luna", "Milo", "Simba"]
  };

  const catNames = catNamesByLang[lang] || catNamesByLang['en'];
  
  const generateRandomName = () => {
    const randomName = catNames[Math.floor(Math.random() * catNames.length)];
    setName(randomName);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setName(name.trim());
      setNameSubmitted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // 多语言文本
  const texts = {
    en: {
      catNameTitle: "What's your cat's name?",
      catNameSubtitle: "Enter a name to start the test",
      placeholder: "e.g., Luna, Milo, Bella",
      randomName: "Random Name",
      startTest: "Start Test →",
      question: "Question {current} of {total}",
      previous: "← Previous"
    },
    zh: {
      catNameTitle: "你的猫叫什么名字？",
      catNameSubtitle: "输入名字开始测试",
      placeholder: "例如：小煤球、咪咪、团子",
      randomName: "随机名字",
      startTest: "开始测试 →",
      question: "问题 {current} / {total}",
      previous: "← 上一题"
    },
    vi: {
      catNameTitle: "Mèo của bạn tên là gì?",
      catNameSubtitle: "Nhập tên để bắt đầu kiểm tra",
      placeholder: "Ví dụ: Luna, Milo, Bella",
      randomName: "Tên ngẫu nhiên",
      startTest: "Bắt đầu →",
      question: "Câu hỏi {current} / {total}",
      previous: "← Trước"
    },
    th: {
      catNameTitle: "แมวของคุณชื่ออะไร?",
      catNameSubtitle: "ใส่ชื่อเพื่อเริ่มทดสอบ",
      placeholder: "เช่น โมจิ, บัวลอย, หมวย",
      randomName: "สุ่มชื่อ",
      startTest: "เริ่มทดสอบ →",
      question: "คำถาม {current} / {total}",
      previous: "← ก่อนหน้า"
    },
    id: {
      catNameTitle: "Nama kucingmu apa?",
      catNameSubtitle: "Masukkan nama untuk memulai tes",
      placeholder: "Misal: Mochi, Oreo, Bella",
      randomName: "Nama Acak",
      startTest: "Mulai Tes →",
      question: "Pertanyaan {current} / {total}",
      previous: "← Sebelumnya"
    }
  };

  const t = texts[lang] || texts['en'];

  if (!nameSubmitted) {
    return (
      <div className="test-container container section">
        <Helmet>
          <title>{t.startTest} - Purrsona</title>
        </Helmet>
        <div className="test-card name-card">
          <div className="test-header">
            <span className="test-emoji">🐱</span>
            <h2 className="test-title">{t.catNameTitle}</h2>
            <p className="test-subtitle">{t.catNameSubtitle}</p>
          </div>
          <form onSubmit={handleNameSubmit} className="name-form">
            <div className="name-input-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.placeholder}
                className="name-input"
                autoFocus
              />
            </div>
            <div className="name-buttons">
              <button type="button" onClick={generateRandomName} className="btn btn-secondary">
                {t.randomName}
              </button>
              <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
                {t.startTest}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="test-container container section">
      <Helmet>
        <title>{t.question.replace('{current}', currentQuestionIndex + 1).replace('{total}', questions.length)} - Purrsona</title>
      </Helmet>
      
      <div className="test-card">
        {/* Progress */}
        <div className="test-progress">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            {t.question.replace('{current}', currentQuestionIndex + 1).replace('{total}', questions.length)}
          </div>
        </div>

        {/* Question */}
        <div className="question-section">
          <p className="question-text">{currentQuestion.statement}</p>
        </div>

        {/* Answer Options */}
        <div className="answer-section">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              className={`btn answer-btn ${answers[currentQuestionIndex] === option.value ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option.value)}
            >
              <span className="answer-emoji">{option.emoji}</span>
              <span className="answer-text">{getAnswerText(option.value, lang)}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="navigation-buttons">
          <button
            className="btn btn-back"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            {t.previous}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
