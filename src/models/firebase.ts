import { createAction, handleActions, Action } from 'redux-actions';
import { useRedux } from 'util/hook/redux';

import firebase from 'firebase';
import config from '../util/firebase';

import { State as GlobalState } from './reducers';

// For Global State usage
export interface State {
	loading: boolean;
	data: { [props: string]: string | number | boolean };
}

const initialState: State = {
	loading: true,
	data: {},
};

export interface AuthTokenActionState {
	token: string;
}

export const loadAuthToken = createAction('LOAD_AUTH_TOKEN', (token: string) => ({
	token,
}));

export const initFirebase = createAction('INIT_FIREBASE', async () => {
	const database = firebase.initializeApp(config).database();
	const data = await database.ref('/test').once('value', e => {
		console.log(e.val());
		return e.val();
	});
	return { data };
});

export const reducer = {
	firebase: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			INIT_FIREBASE_FULFILLED: (state, action) => ({
				...state,
				loading: false,
				data: action.payload.data,
			}),

			LOAD_AUTH_TOKEN: (state, action: Action<AuthTokenActionState>) => ({
				...state,

				token: action.payload.token,
			}),
		},
		initialState,
	),
};

const mapHooksToState = (state: GlobalState) => ({
	firebase: state.firebase,
});

const firebaseActionsMap = {
	initFirebase,
};

type FirebaseSelector = ReturnType<typeof mapHooksToState>;
type FirebaseActionsMap = typeof firebaseActionsMap;

export const useFirebase = () =>
	useRedux<FirebaseSelector, FirebaseActionsMap>(mapHooksToState, firebaseActionsMap);
