import { createAction, handleActions, Action } from 'redux-actions';
import { useRedux } from 'util/hook/redux';
import { Dispatch } from 'redux';
import firebase from 'firebase';

import storage from 'util/storage';
import { isExist } from 'util/helper';

import { openModal } from './modal';

import { GetState, State as GlobalState } from './reducers';
import history from '../store/history';

export interface AuthTokenActionState {
	token: string;
}

export interface GetDataActionState {
	data: { [props: string]: string | number | boolean };
}

export const getData = createAction(
	'GET_DATA',
	(data: { [props: string]: string | number | boolean }) => ({ data }),
);

export const saveTokenAndGetUserData = createAction(
	'SAVE_ACCESS_TOKEN',
	(token: string) => async (dispatch: Dispatch) => {
		storage.setItem('token', JSON.stringify(token));
		const data = firebase.database().ref(`users/${token}`);
		data.on('value', (e: { val: () => { [props: string]: string | number | boolean } }) => {
			dispatch(e.val() === null ? getData({}) : getData(e.val()));
		});

		return { token };
	},
);

export interface UpdateFormActionState {
	type: string;
	key: string;
	value: string;
}

export const updateForm = createAction<UpdateFormActionState, UpdateFormActionState>(
	'UPDATE_FORM',
	({ type, key, value }) => ({
		type,
		key,
		value,
	}),
);

export const login = createAction('LOGIN', () => async (dispatch: Dispatch, getState: GetState) => {
	const {
		auth: {
			loginForm: { email, password },
		},
	} = getState();

	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(async data => {
			await dispatch(saveTokenAndGetUserData(data.user?.uid || ''));
			history.push('/');
		})
		.catch(error => {
			dispatch(openModal({ category: 'alert', type: error.code }));
		});
});

export const signup = createAction(
	'SIGNUP',
	() => async (dispatch: Dispatch, getState: GetState) => {
		const {
			auth: {
				signupForm: { email, password },
			},
		} = getState();

		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async data => {
				await dispatch(saveTokenAndGetUserData(data.user?.uid || ''));
				history.push('/');
			})
			.catch(error => {
				dispatch(openModal({ category: 'alert', type: error.code }));
			});
	},
);

export const forget = createAction(
	'FORGET',
	() => async (dispatch: Dispatch, getState: GetState) => {
		const {
			auth: {
				forgetForm: { email },
			},
		} = getState();

		return firebase
			.auth()
			.sendPasswordResetEmail(email, null)
			.then(() => {
				dispatch(openModal({ category: 'alert', type: 'resetMailSend' }));
			})
			.catch(() => {
				dispatch(openModal({ category: 'alert', type: 'resetMailSendFail' }));
			});
	},
);

export const loginWithGoogle = createAction(
	'LOGIN_WITH_GOOGLE',
	() => async (dispatch: Dispatch) => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().useDeviceLanguage();

		return firebase
			.auth()
			.signInWithPopup(provider)
			.then(async () => {
				await dispatch(saveTokenAndGetUserData(firebase.auth().currentUser?.uid || ''));
				history.push('/');
			})
			.catch(() => {
				dispatch(openModal({ category: 'alert', type: 'fail' }));
			});
	},
);

export const loginWithFaceBook = createAction(
	'LOGIN_WITH_FACEBOOK',
	() => async (dispatch: Dispatch) => {
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().useDeviceLanguage();

		return firebase
			.auth()
			.signInWithPopup(provider)
			.then(async () => {
				await dispatch(saveTokenAndGetUserData(firebase.auth().currentUser?.uid || ''));
				history.push('/');
			})
			.catch(() => {
				dispatch(openModal({ category: 'alert', type: 'fail' }));
			});
	},
);

export const clearTokenData = createAction('CLEAR_TOKEN_DATA');

const logout = createAction('LOGOUT', () => async (dispatch: Dispatch) => {
	storage.removeItem('token');
	dispatch(clearTokenData());
	firebase.auth().signOut();
});

// For Global State usage
export interface State {
	[key: string]: {};
	loginForm: {
		email: string;
		password: string;
	};

	signupForm: {
		email: string;
		password: string;
		repeatPassword: string;
	};

	forgetForm: {
		email: string;
	};
	token: string;
	userInfo: {};
	data: { list: [{ [props: string]: string | number | boolean }] };
}

export const initialState: State = {
	loginForm: {
		email: '',
		password: '',
	},

	signupForm: {
		email: '',
		password: '',
		repeatPassword: '',
	},

	forgetForm: {
		email: '',
	},
	token: '',
	userInfo: {},
	data: {},
};

export const reducer = {
	auth: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			SAVE_ACCESS_TOKEN: (state, action: Action<AuthTokenActionState>) => ({
				...state,

				token: action.payload.token,
			}),

			UPDATE_FORM: (state, action: Action<UpdateFormActionState>) => ({
				...state,
				[action.payload.type]: {
					...state[action.payload.type],
					[action.payload.key]: action.payload.value,
				},
			}),

			GET_DATA: (state, action: Action<GetDataActionState>) => ({
				...state,

				data: action.payload.data,
			}),

			CLEAR_TOKEN_DATA: state => ({
				...state,

				token: '',
			}),
		},
		initialState,
	),
};

const mapHooksToState = (state: GlobalState) => ({
	auth: state.auth,
	isLogin: isExist(state.auth.token),
});

const authActionsMap = {
	updateForm,
	logout,
	login,
	signup,
	forget,
	loginWithGoogle,
	loginWithFaceBook,
};

type AuthSelector = ReturnType<typeof mapHooksToState>;
type AuthActionsMap = typeof authActionsMap;

export const useAuth = () =>
	useRedux<AuthSelector, AuthActionsMap>(mapHooksToState, authActionsMap);
