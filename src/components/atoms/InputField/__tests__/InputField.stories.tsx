import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputField from 'components/atoms/InputField';

const stories = storiesOf('atoms/InputField', module);

stories.add('__interactive', () => (
	<div style={{ width: '300px' }}>
		<InputField
			title={text('title', '標題')}
			placeholder={text('placeholder', 'placeholder')}
			type={text('type', 'text')}
			value={text('value', 'test')}
			onChange={action('onChange')}
			mustFill={boolean('mustFill', true)}
		/>
	</div>
));

stories.add('with error', () => (
	<div style={{ width: '300px' }}>
		<InputField
			title={text('title', '標題')}
			placeholder={text('placeholder', 'placeholder')}
			type={text('type', 'text')}
			value={text('value', 'test')}
			onChange={action('onChange')}
			mustFill={boolean('mustFill', true)}
			error={boolean('error', true)}
			errorText={text('errorText', '錯誤')}
		/>
	</div>
));

stories.add('with type password', () => (
	<div style={{ width: '300px' }}>
		<InputField
			title={text('title', '標題')}
			placeholder={text('placeholder', 'placeholder')}
			type={text('type', 'password')}
			value={text('value', 'test')}
			onChange={action('onChange')}
			mustFill={boolean('mustFill', true)}
		/>
	</div>
));

stories.add('without must fill', () => (
	<div style={{ width: '300px' }}>
		<InputField
			title={text('title', '標題')}
			placeholder={text('placeholder', 'placeholder')}
			type={text('type', 'password')}
			value={text('value', 'test')}
			onChange={action('onChange')}
			mustFill={boolean('mustFill', false)}
		/>
	</div>
));
