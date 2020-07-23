import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import ButtonGoogle from 'components/atoms/ButtonGoogle';

const stories = storiesOf('atoms/ButtonGoogle', module);

stories.add('__interactive', () => (
	<ButtonGoogle text={text('text', 'Google 註冊')} onClick={action('onClick')} />
));
