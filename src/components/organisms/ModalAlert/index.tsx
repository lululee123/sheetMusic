import React from 'react';
import classnames from 'classnames';
import { History } from 'history';
import { hot } from 'react-hot-loader/root';

import { useModal, CloseModalActionState, OpenModalActionState } from 'models/modal';
import { useHistory } from 'models/routing';

import FormAlert from 'components/molecules/FormAlert';
import Modal from 'components/molecules/Modal';

import styles from './index.css';

export interface ModalAlertComponentProperty {
	type: string;
	closeModal: (P: CloseModalActionState) => void;
	openModal: (p: OpenModalActionState) => void;
	history: History;
}

const ModalAlertComponent: React.FC<ModalAlertComponentProperty> = ({
	type,
	history,
	closeModal,
	openModal,
}) => {
	return (
		<div className={classnames(styles.modalAlert)}>
			<FormAlert closeModal={closeModal} openModal={openModal} type={type} history={history} />
		</div>
	);
};

const ModalAlert: React.FC = () => {
	const [
		{
			modal: {
				alert: { type },
			},
		},
		{ closeModal, openModal },
	] = useModal();
	const history = useHistory();

	return (
		<Modal active={type !== ''} className={styles.modal}>
			<ModalAlertComponent
				type={type}
				closeModal={closeModal}
				openModal={openModal}
				history={history}
			/>
		</Modal>
	);
};

export default hot(ModalAlert);
