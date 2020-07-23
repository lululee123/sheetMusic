import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Modal from 'components/molecules/Modal';

const stories = storiesOf('molecules/Modal', module);

stories.add('__interactive', () => <Modal active={boolean('active', true)}>Modal</Modal>);
