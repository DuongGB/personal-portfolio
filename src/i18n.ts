import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import viTranslations from './locales/vi.json';

const resources = {
  en: { translation: enTranslations },
  vi: { translation: viTranslations },
};

const savedLanguage = (typeof window !== 'undefined' && localStorage.getItem('language')) || 'en';
const initialLng = savedLanguage.startsWith('vi') ? 'vi' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language || initialLng;
  i18n.on('languageChanged', (lng) => {
    const normalized = lng.startsWith('vi') ? 'vi' : 'en';
    document.documentElement.lang = normalized;
    localStorage.setItem('language', normalized);
  });
}

export default i18n;

