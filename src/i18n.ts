import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import ur from './locales/ur/translation.json';

i18n
  .use(LanguageDetector) // browser language detect karta hai
  .use(initReactI18next) // react ke sath integrate karta hai
  .init({
    resources: {
      en: { translation: en },
      ur: { translation: ur }
    },
    fallbackLng: 'en', // default agar urdu detect na ho
    interpolation: {
      escapeValue: false, // react already HTML escape karta hai
    }
  });

export default i18n;
