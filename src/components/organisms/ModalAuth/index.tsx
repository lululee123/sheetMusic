import React from 'react';
import classnames from 'classnames';
import { History } from 'history';
import { hot } from 'react-hot-loader/root';

import { useHistory } from 'models/routing';
import { useAuth, State, UpdateFormActionState } from 'models/auth';

import BackIcon from 'images/icon/arrow-blue.inline.svg';

import Icon from 'components/atoms/Icon';
import FormAuth from 'components/molecules/FormAuth';
import Modal from 'components/molecules/Modal';

import styles from './index.css';

export interface ModalAuthComponentProperty extends ModalAuthProperty {
	history: History;
	updateForm: (p: UpdateFormActionState) => void;
	login: () => void;
	signup: () => void;
	forget: () => void;
	loginWithGoogle: () => void;
	loginWithFaceBook: () => void;
	auth: State;
}

const ModalAuthComponent: React.FC<ModalAuthComponentProperty> = ({
	type,
	history,
	auth,
	updateForm,
	login,
	signup,
	forget,
	loginWithGoogle,
	loginWithFaceBook,
}) => {
	const backToLogin = () => {
		history.push('/login');
	};

	return (
		<div className={classnames(styles.modalAuth)}>
			<div className={styles.container}>
				{(type === 'signup' || type === 'forget') && (
					<Icon className={classnames(styles.backBtn)} src={BackIcon} onClick={backToLogin} />
				)}
				<FormAuth
					type={type}
					history={history}
					auth={auth}
					updateForm={updateForm}
					login={login}
					signup={signup}
					forget={forget}
					loginWithGoogle={loginWithGoogle}
					loginWithFaceBook={loginWithFaceBook}
				/>
			</div>
		</div>
	);
};

interface ModalAuthProperty {
	type: string;
}

const ModalAuth: React.FC<ModalAuthProperty> = ({ type }) => {
	const history = useHistory();
	const [
		{ auth },
		{ updateForm, login, signup, forget, loginWithGoogle, loginWithFaceBook },
	] = useAuth();

	return (
		<Modal active={type !== ''}>
			<ModalAuthComponent
				type={type}
				history={history}
				auth={auth}
				updateForm={updateForm}
				login={login}
				signup={signup}
				forget={forget}
				loginWithGoogle={loginWithGoogle}
				loginWithFaceBook={loginWithFaceBook}
			/>
		</Modal>
	);
};

export default hot(ModalAuth);
