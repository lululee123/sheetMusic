import React from 'react';
import classnames from 'classnames';
import { hot } from 'react-hot-loader/root';

import ModalAuth from 'components/organisms/ModalAuth';

import styles from './index.css';

const LoginPage: React.FC = () => {

	return (
		<div className={classnames(styles.loginPage)}>
			<ModalAuth type="login"/>
		</div>
	);
};

export default hot(LoginPage);
