import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import ButtonFacebook from 'components/atoms/ButtonFacebook';

const stories = storiesOf('atoms/ButtonFacebook', module);

stories.add('__interactive', () => (
	<ButtonFacebook text={text('text', 'Facebook 註冊')} onClick={action('onClick')} />
));
