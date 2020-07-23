import React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToggleButton from 'components/atoms/ToggleButton';

const stories = storiesOf('atoms/ToggleButton', module);

stories.add(
	'__interactive',
	() => (
		<ToggleButton
			onOpen={action('open')}
			onClose={action('close')}
			openTitle={text('Open Title', 'Open')}
			closeTitle={text('Close Title', 'Close')}
		/>
	),
	{ jest: 'ToggleButton' },
);
