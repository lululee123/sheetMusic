import React from 'react';
import { storiesOf } from '@storybook/react';

import Division from 'components/atoms/Division';

const stories = storiesOf('atoms/Division', module);

stories.add('__interactive', () => (
	<div style={{ marginTop: '20px' }}>
		<Division />
	</div>
));

stories.add('with vertical', () => (
	<div style={{ marginLeft: '20px', height: '100vh' }}>
		<Division vertical />
	</div>
));
