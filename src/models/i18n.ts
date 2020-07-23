import { createAction, handleActions } from 'redux-actions';
import moment from 'moment';

import { lanList } from 'util/i18nConfig';
import { useRedux } from 'util/hook/redux';
import { State as GlobalState } from './reducers';

export const changeLanguage = createAction('CHANGE_LANGUAGE', (lan: string) => {
	moment.locale(lan);
	document.body.setAttribute('lan', lan);
	return { lan };
});

// For Global State usage
export interface State {
	lan: string;
}

export const initialState: State = {
	lan: lanList[0],
};

export const reducer = {
	i18n: handleActions(
		{
			CHANGE_LANGUAGE: (state, action) => ({
				...state,
				lan: action.payload.lan,
			}),
		},
		initialState,
	),
};

const mapHooksToState = (state: GlobalState) => ({
	i18n: state.i18n,
});
const languageActionsMap = {};

type LanguageSelector = ReturnType<typeof mapHooksToState>;
type LanguageActionsMap = typeof languageActionsMap;

export const useLanguage = () =>
	useRedux<LanguageSelector, LanguageActionsMap>(mapHooksToState, languageActionsMap);
