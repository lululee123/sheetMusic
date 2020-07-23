import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// A modern alternative to CSS resets
import 'normalize.css';
// Global css setting
import './global.css';

import { loadConfigFromLocalStorage } from 'util/helper';

import Router from 'layouts/Router';

import configureStore from './store';
import history from './store/history';
import routes from './routes';

const store = configureStore({});

loadConfigFromLocalStorage(store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} store={store} />
	</Provider>,
	document.getElementById('content'),
);
