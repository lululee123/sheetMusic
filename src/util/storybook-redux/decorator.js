import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import { Provider } from 'react-redux';

import mockStore from 'models/__mocks__/store';

export const withRedux = makeDecorator({
	name: 'withRedux',
	parameterName: 'redux',
	// This means don't run this decorator if the notes decorator is not set
	skipIfNoParametersOrOptions: true,
	wrapper: (getStory, context, { parameters = { data: {} } }) => {
		const channel = addons.getChannel();

		// Our simple API above simply sets the notes parameter to a string,
		// which we send to the channel
		channel.emit('redux/wrapper', parameters);
		// we can also add subscriptions here using channel.on('eventName', callback);

		const store = mockStore(parameters.data);

		return <Provider store={store}>{getStory(context)}</Provider>;
	},
});
