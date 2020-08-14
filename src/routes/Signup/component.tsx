import React from 'react';
import classnames from 'classnames';
import { hot } from 'react-hot-loader/root';

import ModalAuth from 'components/organisms/ModalAuth';

import styles from './index.css';

const SignupPage: React.FC = () => (
	<div className={classnames(styles.signupPage)}>
		<ModalAuth type="signup" />
	</div>
);

export default hot(SignupPage);
