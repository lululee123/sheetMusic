import { createAction, handleActions, Action } from 'redux-actions';
import { useRedux } from 'util/hook/redux';
import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { Dispatch } from 'redux';
import { GetState, State as GlobalState } from './reducers';

export interface GetCurrentSheetActionState {
	data: {};
}

interface UseFabric {
	canvasRef: MutableRefObject<HTMLCanvasElement | null>;
	width: number;
	height: number;
}

export const initFabric = createAction('INIT_FABRIC', ({ canvasRef, width, height }: UseFabric) => {
	const canvas = new fabric.Canvas(canvasRef.current, {
		fireRightClick: true,
		stopContextMenu: true,
		width,
		height,
	});

	return { canvas };
});

export const getCurrentSheet = createAction(
	'GET_CURRENT_SHEET',
	(id: string) => (_dispatch: Dispatch, getState: GetState) => {
		const {
			auth: {
				data: { list: sheetData },
			},
		} = getState();

		return { data: sheetData.find((sheet: { id: number }) => sheet.id === parseInt(id, 10)) };
	},
);

export const clearData = createAction('CLEAR_DATA');

// For Global State usage
export interface State {
	[key: string]: {};
	sheetData: {};
	loading: boolean;
	fabricCanvas: { [key: string]: any };
}

export const initialState: State = {
	sheetData: {},
	loading: true,
	fabricCanvas: {},
};

export const reducer = {
	sheet: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			GET_CURRENT_SHEET: (state, action: Action<GetCurrentSheetActionState>) => ({
				...state,

				loading: false,
				sheetData: action.payload.data,
			}),

			INIT_FABRIC: (state, action) => ({
				...state,

				fabricCanvas: action.payload.canvas,
			}),

			CLEAR_DATA: state => ({
				...state,

				...initialState,
			}),
		},
		initialState,
	),
};

const mapHooksToState = (state: GlobalState) => ({
	sheet: state.sheet,
});

const sheetActionsMap = { initFabric };

type SheetSelector = ReturnType<typeof mapHooksToState>;
type SheetActionsMap = typeof sheetActionsMap;

export const useSheet = () =>
	useRedux<SheetSelector, SheetActionsMap>(mapHooksToState, sheetActionsMap);
