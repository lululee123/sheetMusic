import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';
import { closeModal } from 'models/modal';

const routes: CustomRoute = {
	path: '/signup',
	components: () => [import(/* webpackChunkName: 'login' */ './component')],
	render: ([Signup]) => <Signup />,
	onLeave: async ({ store }) => {
		await store.dispatch(closeModal({ category: 'alert' }));
	},
};
export default routes;
