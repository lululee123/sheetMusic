import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

// A modern alternative to CSS resets
import 'normalize.css';
// Global css setting
import './global.css';

import { initi18next } from 'util/i18n';
import { initFirebase } from 'util/firebase';

import Router from 'layouts/Router';

import configureStore from './store';
import history from './store/history';
import routes from './routes';

const store = configureStore({});
const i18n = initi18next(store);

initFirebase();

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<Provider store={store}>
			<Router history={history} routes={routes} store={store} />
		</Provider>
	</I18nextProvider>,
	document.getElementById('content'),
);
