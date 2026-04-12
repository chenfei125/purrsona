// 猫性格测试题目 - Purrsona（多语言版本）

export const answerOptions = [
  { value: 2, emoji: '😻' },
  { value: 1, emoji: '😸' },
  { value: 0, emoji: '😐' },
  { value: -1, emoji: '😾' },
  { value: -2, emoji: '😿' },
];

// 获取答案选项文本
export const getAnswerText = (value, lang = 'en') => {
  const texts = {
    2: { en: 'Strongly Agree', zh: '非常同意', vi: 'Hoàn toàn đồng ý', th: 'เห็นด้วยอย่างยิ่ง', id: 'Sangat Setuju' },
    1: { en: 'Agree', zh: '同意', vi: 'Đồng ý', th: 'เห็นด้วย', id: 'Setuju' },
    0: { en: 'Neutral', zh: '中立', vi: 'Trung lập', th: 'เป็นกลาง', id: 'Netral' },
    '-1': { en: 'Disagree', zh: '不同意', vi: 'Không đồng ý', th: 'ไม่เห็นด้วย', id: 'Tidak Setuju' },
    '-2': { en: 'Strongly Disagree', zh: '非常不同意', vi: 'Hoàn toàn không đồng ý', th: 'ไม่เห็นด้วยอย่างยิ่ง', id: 'Sangat Tidak Setuju' },
  };
  return texts[value]?.[lang] || texts[value]?.['en'] || '';
};

// 多语言题目
export const getQuestions = (lang = 'en') => {
  const questionsByLang = {
    en: [
      { statement: "My cat likes to be around me most of the time.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'affection', direction: 1 }] },
      { statement: "My cat often sits in the same room as me, but not too close.", mapping: [{ axis: 'social', direction: -1 }, { axis: 'independence', direction: 1 }] },
      { statement: "My cat greets strangers with curiosity rather than hiding.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'confidence', direction: 1 }] },
      { statement: "My cat gets overstimulated if I pet it for too long.", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'aggression', direction: 0.5 }] },
      { statement: "My cat prefers to observe from a distance before approaching.", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'caution', direction: 1 }] },
      { statement: "My cat follows me from room to room throughout the day.", mapping: [{ axis: 'social', direction: 2 }, { axis: 'affection', direction: 1 }] },
      { statement: "My cat enjoys being held and cuddled.", mapping: [{ axis: 'affection', direction: 2 }, { axis: 'social', direction: 1 }] },
      { statement: "My cat has specific spots it likes to rest in alone.", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'territory', direction: 1 }] },
      { statement: "My cat shows affection through slow blinks and gentle head-butts.", mapping: [{ axis: 'affection', direction: 1 }, { axis: 'trust', direction: 1 }] },
      { statement: "My cat can become agitated if its routine is disrupted.", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'routine', direction: 1 }] },
      { statement: "My cat initiates play and interaction frequently.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'energy', direction: 1 }] },
      { statement: "My cat sometimes bites or swats when it's had enough petting.", mapping: [{ axis: 'aggression', direction: 1 }, { axis: 'sensitivity', direction: 1 }] },
    ],
    zh: [
      { statement: "我的猫大部分时间喜欢待在我身边。", mapping: [{ axis: 'social', direction: 1 }, { axis: 'affection', direction: 1 }] },
      { statement: "我的猫经常和我待在同一个房间，但不会太近。", mapping: [{ axis: 'social', direction: -1 }, { axis: 'independence', direction: 1 }] },
      { statement: "我的猫见到陌生人时会好奇地打招呼，而不是躲起来。", mapping: [{ axis: 'social', direction: 1 }, { axis: 'confidence', direction: 1 }] },
      { statement: "如果我摸它太久，它会变得过度兴奋。", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'aggression', direction: 0.5 }] },
      { statement: "我的猫更喜欢先在远处观察，然后再靠近。", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'caution', direction: 1 }] },
      { statement: "我的猫整天跟着我从一个房间到另一个房间。", mapping: [{ axis: 'social', direction: 2 }, { axis: 'affection', direction: 1 }] },
      { statement: "我的猫喜欢被抱着和拥抱。", mapping: [{ axis: 'affection', direction: 2 }, { axis: 'social', direction: 1 }] },
      { statement: "我的猫有特定的地点喜欢独自休息。", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'territory', direction: 1 }] },
      { statement: "我的猫通过慢慢眨眼和轻轻蹭头来表达爱意。", mapping: [{ axis: 'affection', direction: 1 }, { axis: 'trust', direction: 1 }] },
      { statement: "如果日常作息被打乱，我的猫会变得烦躁。", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'routine', direction: 1 }] },
      { statement: "我的猫经常主动发起玩耍和互动。", mapping: [{ axis: 'social', direction: 1 }, { axis: 'energy', direction: 1 }] },
      { statement: "当被摸够了的时候，我的猫有时会咬人或拍打。", mapping: [{ axis: 'aggression', direction: 1 }, { axis: 'sensitivity', direction: 1 }] },
    ],
    vi: [
      { statement: "Mèo của tôi thích ở bên tôi hầu hết thời gian.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'affection', direction: 1 }] },
      { statement: "Mèo của tôi thường ngồi trong cùng phòng với tôi, nhưng không quá gần.", mapping: [{ axis: 'social', direction: -1 }, { axis: 'independence', direction: 1 }] },
      { statement: "Mèo của tôi chào người lạ với sự tò mò thay vì trốn.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'confidence', direction: 1 }] },
      { statement: "Mèo của tôi bị kích thích quá mức nếu tôi vuốt quá lâu.", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'aggression', direction: 0.5 }] },
      { statement: "Mèo của tôi thích quan sát từ xa trước khi tiếp cận.", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'caution', direction: 1 }] },
      { statement: "Mèo của tôi đi theo tôi từ phòng này sang phòng khác suốt cả ngày.", mapping: [{ axis: 'social', direction: 2 }, { axis: 'affection', direction: 1 }] },
      { statement: "Mèo của tôi thích được bế và ôm.", mapping: [{ axis: 'affection', direction: 2 }, { axis: 'social', direction: 1 }] },
      { statement: "Mèo của tôi có những chỗ cụ thể thích nghỉ ngơi một mình.", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'territory', direction: 1 }] },
      { statement: "Mèo của tôi thể hiện tình cảm qua việc chớp mắt chậm và cọ đầu nhẹ nhàng.", mapping: [{ axis: 'affection', direction: 1 }, { axis: 'trust', direction: 1 }] },
      { statement: "Mèo của tôi có thể trở nên bực bội nếu thói quen bị phá vỡ.", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'routine', direction: 1 }] },
      { statement: "Mèo của tôi thường xuyên chủ động chơi và tương tác.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'energy', direction: 1 }] },
      { statement: "Mèo của tôi đôi khi cắn hoặc tát khi đã đủ vuốt.", mapping: [{ axis: 'aggression', direction: 1 }, { axis: 'sensitivity', direction: 1 }] },
    ],
    th: [
      { statement: "แมวของฉันชอบอยู่ข้างฉันส่วนใหญ่ของเวลา", mapping: [{ axis: 'social', direction: 1 }, { axis: 'affection', direction: 1 }] },
      { statement: "แมวของฉันมักนั่งในห้องเดียวกับฉัน แต่ไม่ใกล้มาก", mapping: [{ axis: 'social', direction: -1 }, { axis: 'independence', direction: 1 }] },
      { statement: "แมวของฉันทักทายคนแปลกหน้าด้วยความอยากรู้แทนที่จะซ่อน", mapping: [{ axis: 'social', direction: 1 }, { axis: 'confidence', direction: 1 }] },
      { statement: "แมวของฉันถูกกระตุ้นมากเกินไปถ้าฉันลูบมันนานเกินไป", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'aggression', direction: 0.5 }] },
      { statement: "แมวของฉันชอบสังเกตจากระยะไกลก่อนจะเข้าใกล้", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'caution', direction: 1 }] },
      { statement: "แมวของฉันตามฉันจากห้องหนึ่งไปอีกห้องตลอดทั้งวัน", mapping: [{ axis: 'social', direction: 2 }, { axis: 'affection', direction: 1 }] },
      { statement: "แมวของฉันชอบถูกอุ้มและกอด", mapping: [{ axis: 'affection', direction: 2 }, { axis: 'social', direction: 1 }] },
      { statement: "แมวของฉันมีจุดที่ชอบพักผ่อนคนเดียวโดยเฉพาะ", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'territory', direction: 1 }] },
      { statement: "แมวของฉันแสดงความรักผ่านการกระพริบตาช้าและการซบหัวเบาๆ", mapping: [{ axis: 'affection', direction: 1 }, { axis: 'trust', direction: 1 }] },
      { statement: "แมวของฉันอาจหงุดหงิดถ้ากิจวัตรถูกรบกวน", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'routine', direction: 1 }] },
      { statement: "แมวของฉันเริ่มเล่นและปฏิสัมพันธ์บ่อยครั้ง", mapping: [{ axis: 'social', direction: 1 }, { axis: 'energy', direction: 1 }] },
      { statement: "แมวของฉันบางครั้งกัดหรือตบเมื่อถูกลูบพอแล้ว", mapping: [{ axis: 'aggression', direction: 1 }, { axis: 'sensitivity', direction: 1 }] },
    ],
    id: [
      { statement: "Kucing saya suka berada di dekat saya sebagian besar waktu.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'affection', direction: 1 }] },
      { statement: "Kucing saya sering duduk di ruangan yang sama dengan saya, tapi tidak terlalu dekat.", mapping: [{ axis: 'social', direction: -1 }, { axis: 'independence', direction: 1 }] },
      { statement: "Kucing saya menyapa orang asing dengan rasa ingin tahu daripada bersembunyi.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'confidence', direction: 1 }] },
      { statement: "Kucing saya terlalu terstimulasi jika saya mengelusnya terlalu lama.", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'aggression', direction: 0.5 }] },
      { statement: "Kucing saya lebih suka mengamati dari jauh sebelum mendekati.", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'caution', direction: 1 }] },
      { statement: "Kucing saya mengikuti saya dari kamar ke kamar sepanjang hari.", mapping: [{ axis: 'social', direction: 2 }, { axis: 'affection', direction: 1 }] },
      { statement: "Kucing saya suka digendong dan dipeluk.", mapping: [{ axis: 'affection', direction: 2 }, { axis: 'social', direction: 1 }] },
      { statement: "Kucing saya memiliki tempat khusus untuk beristirahat sendirian.", mapping: [{ axis: 'independence', direction: 1 }, { axis: 'territory', direction: 1 }] },
      { statement: "Kucing saya menunjukkan kasih sayang melalui kedipan lambat dan sandaran kepala lembut.", mapping: [{ axis: 'affection', direction: 1 }, { axis: 'trust', direction: 1 }] },
      { statement: "Kucing saya bisa menjadi gelisah jika rutinitasnya terganggu.", mapping: [{ axis: 'sensitivity', direction: 1 }, { axis: 'routine', direction: 1 }] },
      { statement: "Kucing saya sering memulai bermain dan interaksi.", mapping: [{ axis: 'social', direction: 1 }, { axis: 'energy', direction: 1 }] },
      { statement: "Kucing saya terkadang menggigit atau menampar saat sudah cukup dielus.", mapping: [{ axis: 'aggression', direction: 1 }, { axis: 'sensitivity', direction: 1 }] },
    ],
  };
  
  return questionsByLang[lang] || questionsByLang['en'];
};

// 默认导出英文版本（兼容旧代码）
export const questions = getQuestions('en');
