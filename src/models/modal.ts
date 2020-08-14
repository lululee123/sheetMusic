import { createAction, handleActions, Action } from 'redux-actions';
import { useRedux } from 'util/hook/redux';

import { State as GlobalState } from './reducers';

type modalCategoryType = 'alert';

export interface OpenModalActionState {
	category: modalCategoryType;
	type: string;
	data?: {};
}

export interface OpenModalPayloadActionState {
	category: modalCategoryType;
	type: string;
	data: {};
}

export const openModal = createAction<OpenModalActionState, OpenModalActionState>(
	'OPEN_MODAL',
	({ category, type, data = {} }) => ({
		category,
		type,
		data,
	}),
);

export interface CloseModalActionState {
	category: modalCategoryType;
}

export const closeModal = createAction<CloseModalActionState, CloseModalActionState>(
	'CLOSE_MODAL',
	({ category }) => ({ category }),
);

interface ModalData {
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
}

export type State = Record<modalCategoryType, ModalData>;

const initialState: State = {
	alert: {
		type: '',
		data: {},
	},
};

export const reducer = {
	modal: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			OPEN_MODAL: (state, action: Action<OpenModalPayloadActionState>) => ({
				...state,
				[action.payload.category]: {
					type: action.payload.type,
					data: action.payload.data,
				},
			}),

			CLOSE_MODAL: (state, action: Action<CloseModalActionState>) => ({
				...state,
				[action.payload.category]: {
					type: '',
					data: {},
				},
			}),
		},
		initialState,
	),
};

const mapHooksToState = (state: GlobalState) => ({
	modal: state.modal,
});

const modalActionsMap = {
	openModal,
	closeModal,
};

type ModalSelector = ReturnType<typeof mapHooksToState>;
type ModalActionsMap = typeof modalActionsMap;

export const useModal = () =>
	useRedux<ModalSelector, ModalActionsMap>(mapHooksToState, modalActionsMap);
