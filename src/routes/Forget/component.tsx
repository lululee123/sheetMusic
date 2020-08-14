import React from 'react';
import classnames from 'classnames';
import { hot } from 'react-hot-loader/root';

import ModalAuth from 'components/organisms/ModalAuth';

import styles from './index.css';

const ForgetPage: React.FC = () => (
	<div className={classnames(styles.forgetPage)}>
		<ModalAuth type="forget" />
	</div>
);

export default hot(ForgetPage);
