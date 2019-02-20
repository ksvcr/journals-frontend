import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import en_translation from './en_translation';
import ru_translation from './ru_translation';

const resources = {
  ru: {
    translation: ru_translation
  },
  en: {
    translation: en_translation
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
