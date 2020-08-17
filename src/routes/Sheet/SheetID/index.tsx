import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

import { getCurrentSheet } from 'models/sheet';

const routes: CustomRoute = {
	path: '/:id',
	components: () => [import(/* webpackChunkName: 'orderDetail' */ './component')],
	render: ([SheetDetail]) => <SheetDetail />,
	onEnter: async ({ store, params: { id } }) => {
		store.dispatch(getCurrentSheet(id as string));
	},
};
export default routes;
