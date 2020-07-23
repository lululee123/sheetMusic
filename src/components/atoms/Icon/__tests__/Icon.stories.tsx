import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import Icon from 'components/atoms/Icon';

import QuestionIcon from 'images/icon/circle-question.inline.svg';

const stories = storiesOf('atoms/Icon', module);

stories.add('__interactive', () => (
	<Icon
		src={QuestionIcon}
		size={select('size', ['normal', 'small'], 'normal')}
		onClick={action('onClick')}
	/>
));
