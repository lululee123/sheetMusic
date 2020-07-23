interface Data {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
const data: Data = {};
let isLocalStorageSupport = true;

const prefix = (key: string) => `sheetmMusic-${key}`;

export const getLanguageLocalStorage = () => prefix('i18nextLng');

export const detectLocalStorageSupport = () => {
	try {
		window.localStorage.setItem('test', '1');
		window.localStorage.removeItem('test');
	} catch (e) {
		console.warn('Does not support localStorage', e);
		isLocalStorageSupport = false;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setItem = (key: string, value: any) => {
	const prefixKey = prefix(key);

	if (isLocalStorageSupport) {
		window.localStorage.setItem(prefixKey, value);
		return;
	}

	data[prefixKey] = value;
};

const getItem = (key: string) => {
	const prefixKey = prefix(key);

	if (isLocalStorageSupport) {
		return window.localStorage.getItem(prefixKey);
	}

	if (Object.hasOwnProperty.call(data, prefixKey)) {
		return data[prefixKey];
	}

	return null;
};

const removeItem = (key: string) => {
	const prefixKey = prefix(key);

	if (isLocalStorageSupport) {
		window.localStorage.removeItem(prefixKey);
		return;
	}

	if (Object.hasOwnProperty.call(data, prefixKey)) {
		delete data[prefixKey];
	}
};

export default {
	setItem,
	getItem,
	removeItem,
};
