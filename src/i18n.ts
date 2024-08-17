import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import cnTranslations from './locales/zh.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslations
        },
        zh: {
            translation: cnTranslations
        }
    },
    lng: "zh",
    fallbackLng: "zh",
    interpolation: {
        escapeValue: false // React 已经默认对文本进行转义处理
    }
});

export default i18n;