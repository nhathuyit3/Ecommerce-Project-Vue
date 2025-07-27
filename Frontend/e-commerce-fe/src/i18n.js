import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import vi from './locales/vn.json';

const messages = {
  en,
  vi
};

// Get language from localStorage if exist, default is 'en'
const savedLocale = localStorage.getItem('user_locale') || 'en';

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: savedLocale,
  fallbackLocale: 'en',
  messages,
});

export default i18n;