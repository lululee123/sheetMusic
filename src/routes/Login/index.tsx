import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';
import { closeModal } from 'models/modal';

const routes: CustomRoute = {
	path: '/login',
	components: () => [import(/* webpackChunkName: 'login' */ './component')],
	render: ([Login]) => <Login />,
	onLeave: async ({ store }) => {
		await store.dispatch(closeModal({ category: 'alert' }));
	},
};
export default routes;
