import { combineReducers } from 'redux';

import * as routing from './routing';
import * as i18n from './i18n';
import * as auth from './auth';
import * as modal from './modal';

// For Global State interface
export interface State {
	routing: routing.State;
	i18n: i18n.State;
	auth: auth.State;
	modal: modal.State;
}

export type GetState = () => State;

const reducers = combineReducers<State>({
	...routing.reducer,
	...i18n.reducer,
	...auth.reducer,
	...modal.reducer,
});

export default reducers;
