import React from 'react';
import classnames from 'classnames';
import { History } from 'history';
import { hot } from 'react-hot-loader/root';

import { useHistory } from 'models/routing';

import CloseIcon from 'images/icon/close.inline.svg';
import BackIcon from 'images/icon/arrow-blue.inline.svg';

import Icon from 'components/atoms/Icon';
import FormAuth from 'components/molecules/FormAuth';
import Modal from 'components/molecules/Modal';

import styles from './index.css';

interface ModalAuthComponentProperty extends ModalAuthProperty {
	history: History;
}

const ModalAuthComponent: React.FC<ModalAuthComponentProperty> = ({
	type,
	history,
}) => {


	const backToLogin = () => {
		history.push('/login');
	};

	return (
		<div className={classnames(styles.modalAuth)}>
			<div className={styles.right}>
				{(type === 'signup' || type === 'forget') && (
					<Icon className={classnames(styles.backBtn)} src={BackIcon} onClick={backToLogin} />
				)}
				<Icon className={classnames(styles.closeBtn)} src={CloseIcon} onClick={() => {}} />
				<FormAuth type={type} />
			</div>
		</div>
	);
};

interface ModalAuthProperty {
	type: string;
}

const ModalAuth: React.FC<ModalAuthProperty> = ({ type }) => {
	const history = useHistory();

	return (
		<Modal active={type !== ''}>
			<ModalAuthComponent
				type={type}
				history={history}
			/>
		</Modal>
	);
};

export default hot(ModalAuth);
