import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonWithIcon from 'components/atoms/ButtonWithIcon';

const stories = storiesOf('atoms/ButtonWithIcon', module);

stories.add('__interactive', () => <ButtonWithIcon />);
