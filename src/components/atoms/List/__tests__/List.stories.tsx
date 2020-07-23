import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import List from 'components/atoms/List';

const items = [
	{
		key: 1,
		value: 'Lee',
	},
	{
		key: 2,
		value: 'Mike',
	},
];

const stories = storiesOf('atoms/List', module);

stories.add('__interactive', () => <List items={object('list', items)} />, { jest: 'List' });
