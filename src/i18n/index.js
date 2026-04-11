import en from "./en";
import zh from "./zh";
import vi from "./vi";
import th from "./th";
import id from "./id";

const languages = { en, zh, vi, th, id };

// 默认语言（SSR时使用）
let currentLang = 'en';

export const getLang = () => {
  // 客户端优先从 localStorage 获取
  if (typeof window !== 'undefined' && window.localStorage) {
    currentLang = localStorage.getItem("lang") || "en";
  }
  return currentLang;
};

export const setLang = (lang) => {
  currentLang = lang;
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem("lang", lang);
    // 触发语言变化事件
    window.dispatchEvent(new Event("langchange"));
  }
};

export const t = (key) => {
  const lang = getLang();
  return languages[lang]?.[key] || languages["en"][key] || key;
};

// 获取翻译文本的函数（用于需要动态翻译的对象）
export const getLangText = (keyObj) => {
  const lang = getLang();
  return keyObj?.[lang] || keyObj?.["en"] || keyObj || "";
};

export const languagesList = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "ภาษาไทย", flag: "🇹🇭" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
];