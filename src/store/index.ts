/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

/// <reference path="../../types/redux-thunk-fsa/index.d.ts" />
import { createStore, applyMiddleware, compose } from 'redux';

import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk-fsa';

import reducers from 'models/reducers';

const middlewares = [thunkMiddleware, promiseMiddleware];
let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
	const { createLogger } = require('redux-logger');
	middlewares.push(createLogger());
	composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function configureStore(preState: {}) {
	const store = createStore(reducers, preState, composeEnhancers(applyMiddleware(...middlewares)));

	if (module.hot) {
		module.hot.accept('../models/reducers', () => {
			const nextReducers = require('../models/reducers').default;
			store.replaceReducer(nextReducers);
		});
	}

	return store;
}
