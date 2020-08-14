import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const routes: CustomRoute = {
	path: '/forget',
	components: () => [import(/* webpackChunkName: 'login' */ './component')],
	render: ([Forget]) => <Forget />,
};
export default routes;
