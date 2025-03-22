import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import common_en from './locales/en/common.json'
import common_ru from './locales/ru/common.json'
import common_it from './locales/it/common.json'

const resources = {
    en: {
        common: common_en
    },
    ru: {
        common: common_ru
    },
    it: {
        common: common_it
    }
};

// i18next.use(HttpApi).use(LanguageDetector).init({
//   interpolation: { escapeValue: false },
//   fallbackLng: 'en',

//   resources: resources,
//   whitelist: ['en', 'ru', 'it'],

//   detection: {
//     order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
//     lookupQuerystring: 'lng',
//     lookupCookie: 'i18next',
//     lookupLocalStorage: 'i18nextLng',
//     lookupSessionStorage: 'i18nextLng',

//     // cache user language
//     caches: ['localStorage'],
//     excludeCacheFor: ['cimode'],

//     convertDetectedLanguage: (lng) => lng.split('-')[0]
//   }

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
    .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'en',
        debug: true,

        resources,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupSessionStorage: 'i18nextLng',
            caches: ['localStorage'],
            excludeCacheFor: ['cimode'],
            convertDetectedLanguage: (lng) => lng.split('-')[0]
        }
    });

export default i18n;