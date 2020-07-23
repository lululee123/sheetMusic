import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import Button from 'components/atoms/Button';

const stories = storiesOf('atoms/Button', module);

stories.add('__interactive', () => (
	<Button
		disabled={boolean('disabled', false)}
		feather={boolean('feather', true)}
		type={select('type', ['normal', 'outline', 'link'], 'normal')}
		size={select('size', ['large', 'normal', 'small'], 'normal')}
		color={select('color', ['blue', 'white'], 'blue')}
	>
		下一步
	</Button>
));

stories.add('with samll feather', () => (
	<Button disabled={boolean('disabled', false)} feather={boolean('feather', true)}>
		下一步
	</Button>
));
