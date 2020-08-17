import storage from './storage';

export const loadTokenFromLocalStorage = () => {
	const tokenData = storage.getItem('token');

	return tokenData === null ? '' : JSON.parse(tokenData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isExist = (value: any) =>
	value !== null && value !== '' && typeof value !== 'undefined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: any) => !isExist(value);

export function emailValid(email: string) {
	// eslint-disable-next-line no-useless-escape
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export function passwordValid(password: string) {
	// 包含一數字及一小寫英文字母，長度 8 ~ 12
	return password.match(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,12}$/);
}
