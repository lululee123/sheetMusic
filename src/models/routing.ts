import { createAction, handleActions } from 'redux-actions';
import { createContext, useContext } from 'react';
import { Location, History } from 'history';

import history from 'store/history';

export const routeChange = createAction<Location, Location>(
	'ROUTE_LOCATION_CHANGE',
	(location: Location) => location,
);

export type State = Location;

export const reducer = {
	routing: handleActions<Location, Location>(
		{
			ROUTE_LOCATION_CHANGE: (state, action) => ({
				...state,
				...action.payload,
			}),
		},
		{ ...history.location },
	),
};

export const HistoryContext = createContext<History>(history);

export const useHistory = () => useContext(HistoryContext);
