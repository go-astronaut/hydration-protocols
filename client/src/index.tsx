// import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { BACK_END_PATH } from "./Constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// initialize translations
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Options for i18next
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      // Cache the language in localStorage
      caches: ["localStorage"],
    },
    backend: {
      loadPath: `${BACK_END_PATH}/user/get-translations/{{lng}}`,
    },
    // This tells i18next to load only language codes (without region codes)
    load: "languageOnly",
  });

root.render(<App />);
