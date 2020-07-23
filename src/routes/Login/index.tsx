import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const routes: CustomRoute = {
	path: '/login',
	components: () => [import(/* webpackChunkName: 'login' */ './component')],
	render: ([Login]) => <Login />,
	onEnter: async () => {

	},
};
export default routes;
