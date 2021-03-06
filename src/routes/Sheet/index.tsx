import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

import IdRoute from './SheetID';
import AddRoute from './SheetAdd';

const routes: CustomRoute = {
	path: '/sheet',
	components: () => [],
	render: (_, children) => children,
	children: [
		{
			path: '',
			components: () => [import(/* webpackChunkName: 'order' */ './component')],
			render: ([Empty]) => <Empty />,
			onEnter: async ({ history }) => {
				history.replace('/');
			},
		},
		IdRoute,
		AddRoute,
	],
};
export default routes;
