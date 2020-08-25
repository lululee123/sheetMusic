import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const routes: CustomRoute = {
	path: '/add',
	components: () => [import(/* webpackChunkName: 'orderDetail' */ './component')],
	render: ([SheetAdd]) => <SheetAdd />,
};
export default routes;
