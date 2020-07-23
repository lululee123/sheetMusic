import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Store } from 'redux';

import { lanList, LANGUAGE_NAME_MAP } from './i18nConfig';

import { changeLanguage } from '../models/i18n';

import { getLanguageLocalStorage } from './storage';

export const mapLanguageOption = (value: string) => ({
	value,
	label: LANGUAGE_NAME_MAP[value],
});

export const initi18next = (store: Store) => {
	const lngDetector = new LanguageDetector();

	i18n
		.use(XHR)
		.use(lngDetector)
		.use(initReactI18next)
		.init(
			{
				fallbackLng: lanList[0],
				whitelist: lanList,
				load: 'currentOnly',

				// have a common namespace used around the full app
				ns: ['common'],
				defaultNS: 'common',

				debug: process.env.NODE_ENV !== 'production',

				interpolation: {
					escapeValue: false, // not needed for react!!
				},

				detection: {
					order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
					lookupLocalStorage: getLanguageLocalStorage(),
				},

				cache: ['localStorage'],

				react: {
					useSuspense: false,
				},

				backend: {
					loadPath: `/static/resources/{{lng}}/{{ns}}.json`,
				},
			},
			() => {
				if (store) {
					let lan = i18n.language;
					if (!lanList.includes(i18n.language)) {
						[lan] = lanList;

						console.warn(`${i18n.language} is not in the translation resources`);
					}
					i18n.changeLanguage(lan);
				}
			},
		);

	i18n.on('languageChanged', () => {
		if (store) {
			store.dispatch(changeLanguage(i18n.language));
		}
	});

	return i18n;
};

export const changeLng = (lng: string) => {
	let lan = lng;

	if (!lanList.includes(lng)) {
		[lan] = lanList;

		console.warn(`${lng} is not in the translation resources`);
	}

	i18n.changeLanguage(lan);
};

export const getLanguage = () => i18n.language;

export const t = (keys: string, options?: string) => i18n.t(keys, options);
