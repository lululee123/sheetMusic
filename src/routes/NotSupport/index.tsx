import React from 'react';

import { CustomRoute } from 'util/hook/useRouter';

const routes: CustomRoute = {
	path: '/notSupport',
	components: () => [import(/* webpackChunkName: 'notSupport' */ './component')],
	render: ([NotSupport]) => <NotSupport />,
	onEnter: async () => {

	},
};

export default routes;
