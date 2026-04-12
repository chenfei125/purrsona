import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getLang } from '../i18n';
import '../styles/AboutUsPage.css';

const AboutUsPage = () => {
  const [, setUpdate] = useState(0);
  const lang = getLang();

  useEffect(() => {
    const handleLangChange = () => setUpdate(prev => prev + 1);
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  const texts = {
    en: {
      title: 'About Purrsona',
      subtitle: 'A Cat Personality Test & Emotional Insight Platform',
      missionTitle: 'Our Mission',
      missionText: 'Purrsona helps cat owners discover their cat\'s hidden personality through a fun and insightful test. Understand your cat\'s emotions, behavior patterns, trust level, and relationship style in a way that feels simple, engaging, and valuable.',
      visionTitle: 'Our Vision',
      visionText: 'We envision a world where every cat owner deeply understands their feline companion. By bridging the communication gap between cats and humans, we help create stronger bonds, better care, and happier homes for cats everywhere.',
      howItWorksTitle: 'How It Works',
      howItWorksText: 'Our personality test is based on behavioral science and cat psychology research. By analyzing your cat\'s responses to everyday situations, we can identify personality patterns and provide personalized insights that help you become a better cat parent.',
      valuesTitle: 'Our Values',
      value1Title: '🐾 Cat-First Approach',
      value1Text: 'Every feature we build is designed with cats\' wellbeing in mind.',
      value2Title: '💡 Science-Based Insights',
      value2Text: 'Our analysis is grounded in behavioral research and feline psychology.',
      value3Title: '❤️ Strengthening Bonds',
      value3Text: 'We believe understanding leads to better relationships between cats and humans.',
      value4Title: '🔒 Privacy Protected',
      value4Text: 'Your cat\'s data stays yours. We never share or sell information.',
      statsTitle: 'By The Numbers',
      stat1Number: '50K+',
      stat1Label: 'Cats Tested',
      stat2Number: '4',
      stat2Label: 'Personality Types',
      stat3Number: '8',
      stat3Label: 'Analysis Modules',
      stat4Number: '95%',
      stat4Label: 'User Satisfaction',
    },
    zh: {
      title: '关于 Purrsona',
      subtitle: '猫性格测试与情绪分析平台',
      missionTitle: '我们的使命',
      missionText: 'Purrsona 通过有趣而深入的测试，帮助养猫用户了解猫咪隐藏的性格、情绪状态、行为模式、信任程度以及与主人的关系。',
      visionTitle: '我们的愿景',
      visionText: '我们希望每一个养猫人都能深度理解自己的猫咪伙伴。通过弥合猫咪和人类之间的沟通鸿沟，我们帮助建立更紧密的联系、更好的照顾，让每个家庭都有更快乐的猫咪。',
      howItWorksTitle: '工作原理',
      howItWorksText: '我们的性格测试基于行为科学和猫咪心理学研究。通过分析你的猫对日常情境的反应，我们可以识别性格模式并提供个性化见解，帮助你成为更好的猫家长。',
      valuesTitle: '我们的价值观',
      value1Title: '🐾 猫咪优先',
      value1Text: '我们构建的每个功能都以猫咪的福祉为核心考量。',
      value2Title: '💡 科学依据',
      value2Text: '我们的分析基于行为研究和猫咪心理学的理论基础。',
      value3Title: '❤️ 增强纽带',
      value3Text: '我们相信理解能带来更好的人猫关系。',
      value4Title: '🔒 隐私保护',
      value4Text: '你猫的数据只属于你。我们从不分享或出售信息。',
      statsTitle: '数据一览',
      stat1Number: '50K+',
      stat1Label: '猫咪已测试',
      stat2Number: '4',
      stat2Label: '性格类型',
      stat3Number: '8',
      stat3Label: '分析模块',
      stat4Number: '95%',
      stat4Label: '用户满意度',
    },
    vi: {
      title: 'Về Purrsona',
      subtitle: 'Nền tảng kiểm tra tính cách mèo và phân tích cảm xúc',
      missionTitle: 'Sứ mệnh của chúng tôi',
      missionText: 'Purrsona giúp chủ mèo khám phá tính cách ẩn giấu của mèo thông qua bài kiểm tra thú vị. Hiểu cảm xúc, hành vi và mức độ tin tưởng của mèo một cách đơn giản và có giá trị.',
      visionTitle: 'Tầm nhìn của chúng tôi',
      visionText: 'Chúng tôi hình dung một thế giới nơi mọi chủ mèo đều hiểu sâu sắc người bạn mèo của mình. Bằng cách thu hẹp khoảng cách giao tiếp giữa mèo và con người.',
      howItWorksTitle: 'Cách hoạt động',
      howItWorksText: 'Bài kiểm tra tính cách của chúng tôi dựa trên khoa học hành vi và tâm lý học mèo.',
      valuesTitle: 'Giá trị của chúng tôi',
      value1Title: '🐾 Mèo là ưu tiên',
      value1Text: 'Mọi tính năng đều được thiết kế với sự an toàn của mèo.',
      value2Title: '💡 Dựa trên khoa học',
      value2Text: 'Phân tích của chúng tôi dựa trên nghiên cứu hành vi.',
      value3Title: '❤️ Tăng cường kết nối',
      value3Text: 'Hiểu biết dẫn đến mối quan hệ tốt hơn.',
      value4Title: '🔒 Bảo vệ quyền riêng tư',
      value4Text: 'Dữ liệu mèo của bạn thuộc về bạn.',
      statsTitle: 'Số liệu',
      stat1Number: '50K+',
      stat1Label: 'Mèo đã kiểm tra',
      stat2Number: '4',
      stat2Label: 'Loại tính cách',
      stat3Number: '8',
      stat3Label: 'Mô-đun phân tích',
      stat4Number: '95%',
      stat4Label: 'Hài lòng',
    },
    th: {
      title: 'เกี่ยวกับ Purrsona',
      subtitle: 'แพลตฟอร์มทดสอบบุคลิกแมวและการวิเคราะห์อารมณ์',
      missionTitle: 'ภารกิจของเรา',
      missionText: 'Purrsona ช่วยให้เจ้าของแมวค้นพบบุคลิกที่ซ่อนอยู่ของแมวผ่านการทดสอบที่สนุกและมีข้อมูลเชิงลึก',
      visionTitle: 'วิสัยทัศน์ของเรา',
      visionText: 'เรามองเห็นโลกที่เจ้าของแมวทุกคนเข้าใจเพื่อนแมวของพวกเขาอย่างลึกซึ้ง',
      howItWorksTitle: 'วิธีการทำงาน',
      howItWorksText: 'การทดสอบบุคลิกของเราอิงจากวิทยาศาสตร์พฤติกรรมและจิตวิทยาแมว',
      valuesTitle: 'ค่านิยมของเรา',
      value1Title: '🐾 แมวเป็นอันดับหนึ่ง',
      value1Text: 'ทุกฟีเจอร์ออกแบบด้วยความคิดถึงความเป็นอยู่ของแมว',
      value2Title: '💡 อิงจากวิทยาศาสตร์',
      value2Text: 'การวิเคราะห์ของเราอิงจากการวิจัยพฤติกรรม',
      value3Title: '❤️ เสริมสายสัมพันธ์',
      value3Text: 'ความเข้าใจนำไปสู่ความสัมพันธ์ที่ดีขึ้น',
      value4Title: '🔒 ปกป้องความเป็นส่วนตัว',
      value4Text: 'ข้อมูลแมวของคุณเป็นของคุณ',
      statsTitle: 'ตัวเลข',
      stat1Number: '50K+',
      stat1Label: 'แมวที่ทดสอบ',
      stat2Number: '4',
      stat2Label: 'ประเภทบุคลิก',
      stat3Number: '8',
      stat3Label: 'โมดูลวิเคราะห์',
      stat4Number: '95%',
      stat4Label: 'ความพึงพอใจ',
    },
    id: {
      title: 'Tentang Purrsona',
      subtitle: 'Platform Tes Kepribadian Kucing & Wawasan Emosional',
      missionTitle: 'Misi Kami',
      missionText: 'Purrsona membantu pemilik kucing menemukan kepribadian tersembunyi kucing mereka melalui tes yang menyenangkan dan mendalam.',
      visionTitle: 'Visi Kami',
      visionText: 'Kami membayangkan dunia di mana setiap pemilik kucing memahami teman kucing mereka secara mendalam.',
      howItWorksTitle: 'Cara Kerja',
      howItWorksText: 'Tes kepribadian kami didasarkan pada ilmu perilaku dan psikologi kucing.',
      valuesTitle: 'Nilai-Nilai Kami',
      value1Title: '🐾 Kucing Diutamakan',
      value1Text: 'Setiap fitur dirancang dengan kesejahteraan kucing dalam pikiran.',
      value2Title: '💡 Berbasis Sains',
      value2Text: 'Analisis kami berdasarkan penelitian perilaku.',
      value3Title: '❤️ Memperkuat Ikatan',
      value3Text: 'Pemahaman mengarah pada hubungan yang lebih baik.',
      value4Title: '🔒 Melindungi Privasi',
      value4Text: 'Data kucing Anda adalah milik Anda.',
      statsTitle: 'Angka',
      stat1Number: '50K+',
      stat1Label: 'Kucing Dites',
      stat2Number: '4',
      stat2Label: 'Tipe Kepribadian',
      stat3Number: '8',
      stat3Label: 'Modul Analisis',
      stat4Number: '95%',
      stat4Label: 'Kepuasan',
    },
  };

  const t = texts[lang] || texts['en'];

  return (
    <div className="about-us-page">
      <Helmet>
        <title>{t.title} - Purrsona</title>
        <meta name="description" content={t.missionText} />
      </Helmet>

      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>{t.title}</h1>
            <p className="about-subtitle">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="about-section">
        <div className="container">
          <h2 className="section-title">{t.missionTitle}</h2>
          <p className="section-text">{t.missionText}</p>
        </div>
      </div>

      {/* Vision */}
      <div className="about-section alt-bg">
        <div className="container">
          <h2 className="section-title">{t.visionTitle}</h2>
          <p className="section-text">{t.visionText}</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="about-section">
        <div className="container">
          <h2 className="section-title">{t.howItWorksTitle}</h2>
          <p className="section-text">{t.howItWorksText}</p>
        </div>
      </div>

      {/* Values */}
      <div className="about-section alt-bg">
        <div className="container">
          <h2 className="section-title">{t.valuesTitle}</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>{t.value1Title}</h3>
              <p>{t.value1Text}</p>
            </div>
            <div className="value-card">
              <h3>{t.value2Title}</h3>
              <p>{t.value2Text}</p>
            </div>
            <div className="value-card">
              <h3>{t.value3Title}</h3>
              <p>{t.value3Text}</p>
            </div>
            <div className="value-card">
              <h3>{t.value4Title}</h3>
              <p>{t.value4Text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats">
        <div className="container">
          <h2 className="section-title">{t.statsTitle}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{t.stat1Number}</span>
              <span className="stat-label">{t.stat1Label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t.stat2Number}</span>
              <span className="stat-label">{t.stat2Label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t.stat3Number}</span>
              <span className="stat-label">{t.stat3Label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t.stat4Number}</span>
              <span className="stat-label">{t.stat4Label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
