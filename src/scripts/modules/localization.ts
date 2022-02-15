import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { ENV } from 'modules/env';
import localeCs from 'localization/locales.cs.json';
import localeEn from 'localization/locales.en.json';

export const i18n = i18next
    .use(initReactI18next)
    .init({
        resources: {
            cs: {
                translation: localeCs,
            },
            en: {
                translation: localeEn,
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        debug: ENV.isDev,
        interpolation: {
            escapeValue: false,
        },
        parseMissingKeyHandler: () => {
            return ''; // return empty string when translated key does not exist
        },
    });
