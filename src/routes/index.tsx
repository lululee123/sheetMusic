import React from 'react';

import { CustomRoute } from 'util/hook/useRouter';

import { isEmpty } from 'util/helper';
import storage from 'util/storage';

import LoginRoute from './Login';
import SignupRoute from './Signup';
import ForgetRoute from './Forget';
import NotSupportRoute from './NotSupport';

const routes: CustomRoute = {
	path: '/',
	components: () => [],
	render: (_, children) => children,
	children: [
		{
			path: '',
			components: () => [import(/* webpackChunkName: 'home' */ './Home')],
			render: ([Home]) => <Home />,
			onEnter: async ({ history }) => {
				if (isEmpty(storage.getItem('token'))) {
					// 沒有 token，導去登入
					history.replace('/login');
				}
			},
		},
		LoginRoute,
		SignupRoute,
		ForgetRoute,
		NotSupportRoute,
	],
};

export default routes;
