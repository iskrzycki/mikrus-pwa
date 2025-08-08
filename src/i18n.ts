import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import plTranslation from "./locales/pl.json";

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === "development",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      pl: {
        translation: plTranslation,
      },
    },
    detection: {
      order: ["localStorage"],
      // order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
