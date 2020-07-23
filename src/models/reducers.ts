import { combineReducers } from 'redux';

import * as routing from './routing';
import * as firebase from './firebase';
import * as i18n from './i18n';

// For Global State interface
export interface State {
	routing: routing.State;
	firebase: firebase.State;
	i18n: i18n.State;
}

const reducers = combineReducers<State>({
	...routing.reducer,
	...firebase.reducer,
	...i18n.reducer,
});

export default reducers;
