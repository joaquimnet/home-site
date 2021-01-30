import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
import resources from './assets/locales.json';

export const LOCAL_STORAGE_LANGUAGE_KEY = 'dev.joaquimneto.language';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
