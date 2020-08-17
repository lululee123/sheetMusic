import React from 'react';

import { CustomRoute } from 'util/hook/useRouter';
import { isEmpty, loadTokenFromLocalStorage } from 'util/helper';

import { saveTokenAndGetUserData } from 'models/auth';

import LoginRoute from './Login';
import SignupRoute from './Signup';
import ForgetRoute from './Forget';
import SheetRoute from './Sheet';
import NotSupportRoute from './NotSupport';

const routes: CustomRoute = {
	path: '/',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ store, history }) => {
		if (isEmpty(loadTokenFromLocalStorage())) {
			// 沒有 token，導去登入
			history.replace('/login');
		} else {
			await store.dispatch(saveTokenAndGetUserData(loadTokenFromLocalStorage()));
		}
	},
	children: [
		{
			path: '',
			components: () => [import(/* webpackChunkName: 'home' */ './Home')],
			render: ([Home]) => <Home />,
		},
		LoginRoute,
		SignupRoute,
		ForgetRoute,
		SheetRoute,
		NotSupportRoute,
	],
};

export default routes;
