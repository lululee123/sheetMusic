import { createAction, handleActions, Action } from 'redux-actions';
import { useRedux } from 'util/hook/redux';
import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { Dispatch } from 'redux';
import { GetState, State as GlobalState } from './reducers';

export interface GetCurrentSheetActionState {
	data: {};
}

export interface ImagesProperty {
	id: number;
	url: string;
	canvas: any;
}

export interface UseFabric {
	canvasRef: MutableRefObject<HTMLCanvasElement | null>;
	width: number | undefined;
	height: number | undefined;
}

export const initFabric = createAction('INIT_FABRIC', ({ canvasRef, width, height }: UseFabric) => {
	const canvas = new fabric.Canvas(canvasRef.current, {
		fireRightClick: true,
		stopContextMenu: true,
		isDrawingMode: true,
		width,
		height,
	});

	canvas.freeDrawingBrush.color = 'rgba(255,0,0)';
	canvas.freeDrawingBrush.width = 6;

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

export interface UpdateFabricCanvasParametersActionState {
	key: string;
	value: string | number;
}

export const updateFabricCanvasParameters = createAction<
	UpdateFabricCanvasParametersActionState,
	UpdateFabricCanvasParametersActionState
>('UPDATE_FABRICP_CANVAS_PARAMETERS', ({ key, value }) => ({
	key,
	value,
}));

export const resetFabricCanvas = createAction('RESET_FABRIC_CANVAS');

export const clearData = createAction('CLEAR_DATA');

export const zoomCanvas = createAction(
	'ZOOM_CANVAS',
	(zoom: number | string) => (_dispatch: Dispatch, getState: GetState) => {
		const {
			sheet: {
				fabricCanvas,
				fabricCanvasParameters: { degrees, baseScale, proportion, containerWidth },
			},
		} = getState();

		const resizeCanvas = (newZoom: number) => {
			const scaleWithoutBase = newZoom / baseScale;
			fabricCanvas.setHeight(
				degrees === 90 || degrees === -90 || degrees === 270 || degrees === -270
					? containerWidth * scaleWithoutBase
					: (containerWidth / proportion) * scaleWithoutBase,
			);
			fabricCanvas.setWidth(
				degrees === 90 || degrees === -90 || degrees === 270 || degrees === -270
					? (containerWidth / proportion) * scaleWithoutBase
					: containerWidth * scaleWithoutBase,
			);
			fabricCanvas.setZoom(newZoom);
		};

		if (zoom === 'reset') {
			resizeCanvas(1 * baseScale);
		} else {
			const newZoom = fabricCanvas.getZoom() + zoom;
			const fixedNewZoom = parseFloat(newZoom.toFixed(1));
			if (fixedNewZoom >= 0.1) {
				resizeCanvas(fixedNewZoom);
			}
		}
		console.log(fabricCanvas.getZoom());
	},
);

// For Global State usage
export interface State {
	[key: string]: {};
	currentSheetData: {};
	loading: boolean;
	fabricCanvas: { [key: string]: any };
	fabricCanvasParameters: any;
}

export const initialState: State = {
	currentSheetData: {},
	loading: true,
	fabricCanvas: {},
	fabricCanvasParameters: {
		containerWidth: 0,
		containerHeight: 0,
		imageOriginWidth: 0,
		imageOriginHeight: 0,
		proportion: 1,
		degrees: 0,
		baseScale: 1,
	},
};

export const reducer = {
	sheet: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			GET_CURRENT_SHEET: (state, action: Action<GetCurrentSheetActionState>) => ({
				...state,

				loading: false,
				currentSheetData: action.payload.data,
			}),

			INIT_FABRIC: (state, action) => ({
				...state,

				fabricCanvas: action.payload.canvas,
			}),

			UPDATE_FABRICP_CANVAS_PARAMETERS: (
				state,
				action: Action<UpdateFabricCanvasParametersActionState>,
			) => ({
				...state,
				fabricCanvasParameters: {
					...state.fabricCanvasParameters,
					[action.payload.key]: action.payload.value,
				},
			}),

			RESET_FABRIC_CANVAS: state => ({
				...state,

				fabricCanvasParameters: {
					...state.fabricCanvasParameters,
					imageOriginWidth: 0,
					imageOriginHeight: 0,
					proportion: 1,
				},
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

const sheetActionsMap = {
	initFabric,
	updateFabricCanvasParameters,
	resetFabricCanvas,
	zoomCanvas,
};

type SheetSelector = ReturnType<typeof mapHooksToState>;
type SheetActionsMap = typeof sheetActionsMap;

export const useSheet = () =>
	useRedux<SheetSelector, SheetActionsMap>(mapHooksToState, sheetActionsMap);
