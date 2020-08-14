import React, { useState, ReactElement } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { emailValid, passwordValid } from 'util/helper';

import ButtonGoogle from 'components/atoms/ButtonGoogle';
import ButtonFacebook from 'components/atoms/ButtonFacebook';
import Division from 'components/atoms/Division';
import InputField from 'components/atoms/InputField';
import Button from 'components/atoms/Button';
import Link from 'components/atoms/Link';

import { State, UpdateFormActionState } from 'models/auth';
import { ModalAuthComponentProperty } from 'components/organisms/ModalAuth';

import styles from './index.css';

interface FormBasicProperty {
	contentClassName?: string;
	footerClassName?: string;
	renderContent: () => null | ReactElement;
	renderFooter?: () => null | ReactElement;
}

const FormBasic: React.FC<FormBasicProperty> = ({
	contentClassName,
	footerClassName,
	renderContent = () => null,
	renderFooter = () => null,
}) => (
	<div className={styles.formBasic}>
		<div className={classnames(styles.content, contentClassName)}>{renderContent()}</div>
		{typeof renderFooter !== 'undefined' && (
			<div className={classnames(styles.footer, footerClassName)}>{renderFooter()}</div>
		)}
	</div>
);

interface FormProperty {
	updateForm: (props: UpdateFormActionState) => void;
	auth: State;
}

interface FormLoginProperty extends FormProperty {
	login: () => void;
	loginWithGoogle: () => void;
	loginWithFaceBook: () => void;
}

const FormLogin: React.FC<FormLoginProperty> = ({
	auth,
	updateForm,
	login,
	loginWithGoogle,
	loginWithFaceBook,
}) => {
	const { t } = useTranslation(['auth']);
	const [emailError, setEmailError] = useState(false);
	const checkLogin = () => {
		if (!emailValid(auth.loginForm.email)) {
			setEmailError(true);
		} else {
			login();
		}
	};

	return (
		<FormBasic
			contentClassName={styles.formSignup}
			renderContent={() => (
				<>
					<div className={styles.title}>{t('login')}</div>
					<div className={styles.buttons}>
						<ButtonGoogle
							className={styles.socialButton}
							text={`Google ${t('login')}`}
							onClick={loginWithGoogle}
						/>
						<ButtonFacebook
							className={styles.socialButton}
							text={`Facebook ${t('login')}`}
							onClick={loginWithFaceBook}
						/>
					</div>
					<div className={styles.division}>
						<Division />
						<span>{t('or')}</span>
						<Division />
					</div>
					<InputField
						className={styles.bigMargin}
						title={t('account')}
						placeholder={t('loginAccountPlaceholder')}
						type="text"
						value={auth.loginForm.email}
						onChange={e => {
							updateForm({ type: 'loginForm', key: 'email', value: e.target.value });
							setEmailError(false);
						}}
						mustFill
						error={emailError}
						errorText={t('mailFormatError')}
					/>
					<InputField
						className={styles.smallMargin}
						title={t('password')}
						placeholder={t('loginPasswordPlaceholder')}
						type="password"
						value={auth.loginForm.password}
						onChange={e => {
							updateForm({ type: 'loginForm', key: 'password', value: e.target.value });
						}}
						mustFill
					/>
					<Button
						className={classnames(styles.singelBtn, styles.bigMargin)}
						textClassName={styles.text}
						onClick={checkLogin}
						disabled={!(auth.loginForm.email && auth.loginForm.password)}
					>
						{t('login')}
					</Button>
				</>
			)}
			footerClassName={styles.formLoginFooter}
			renderFooter={() => (
				<>
					<div className={styles.item}>
						<Link className={styles.button} to="/forget">{`${t('forget')}?`}</Link>
					</div>
					<div className={classnames(styles.loginFootMargin, styles.item)}>
						{`${t('noAccount')} `}
						<Link className={styles.button} to="/signup">{`${t('signup')}?`}</Link>
					</div>
				</>
			)}
		/>
	);
};

interface FormSignupProperty extends FormProperty {
	signup: () => void;
	loginWithGoogle: () => void;
	loginWithFaceBook: () => void;
}

const FormSignup: React.FC<FormSignupProperty> = ({
	updateForm,
	auth,
	signup,
	loginWithGoogle,
	loginWithFaceBook,
}) => {
	const { t } = useTranslation(['auth']);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState({ status: false, text: '' });

	const checkSignup = () => {
		if (!emailValid(auth.signupForm.email)) {
			setEmailError(true);
		} else if (!passwordValid(auth.signupForm.password)) {
			setPasswordError({ status: true, text: `${t('passwordFormatError')}` });
		} else if (auth.signupForm.password !== auth.signupForm.repeatPassword) {
			setPasswordError({ status: true, text: `${t('notSame')}` });
		} else {
			signup();
		}
	};

	return (
		<FormBasic
			contentClassName={styles.formSignup}
			renderContent={() => (
				<>
					<div className={styles.title}>{t('signup')}</div>
					<div className={styles.buttons}>
						<ButtonGoogle
							className={styles.socialButton}
							text={`Google ${t('signup')}`}
							onClick={loginWithGoogle}
						/>
						<ButtonFacebook
							className={styles.socialButton}
							text={`Facebook ${t('signup')}`}
							onClick={loginWithFaceBook}
						/>
					</div>
					<div className={styles.division}>
						<Division />
						<span>{t('or')}</span>
						<Division />
					</div>
					<InputField
						className={styles.bigMargin}
						title={t('account')}
						placeholder={t('accountPlaceholder')}
						type="text"
						value={auth.signupForm.email}
						onChange={e => {
							updateForm({ type: 'signupForm', key: 'email', value: e.target.value });
							setEmailError(false);
						}}
						mustFill
						error={emailError}
						errorText={t('mailFormatError')}
					/>
					<div className={styles.passwordBox}>
						<InputField
							title={t('password')}
							placeholder={t('passwordPlaceholder')}
							type="password"
							value={auth.signupForm.password}
							onChange={e => {
								updateForm({ type: 'signupForm', key: 'password', value: e.target.value });
								setPasswordError({ status: false, text: '' });
							}}
							error={passwordError.status}
							errorText={passwordError.status ? passwordError.text : ''}
							mustFill
						/>
						<InputField
							title={t('confirmPassword')}
							placeholder={t('confirmPasswordPlaceholder')}
							type="password"
							value={auth.signupForm.repeatPassword}
							onChange={e => {
								updateForm({ type: 'signupForm', key: 'repeatPassword', value: e.target.value });
								setPasswordError({ status: false, text: '' });
							}}
							mustFill
						/>
					</div>
					<Button
						className={classnames(styles.singelBtn, styles.bigMargin)}
						textClassName={styles.text}
						onClick={checkSignup}
						disabled={
							!(auth.signupForm.email && auth.signupForm.password && auth.signupForm.repeatPassword)
						}
					>
						{t('signup')}
					</Button>
				</>
			)}
			footerClassName={styles.formSignupFooter}
			renderFooter={() => (
				<div className={styles.item}>
					{`${t('hasAccount')} `}
					<Link className={styles.button} to="/login">{`${t('login')}?`}</Link>
				</div>
			)}
		/>
	);
};

interface FormForgetProperty extends FormProperty {
	forget: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormForget: React.FC<FormForgetProperty> = ({ auth, updateForm, forget }) => {
	const { t } = useTranslation(['auth']);
	const [emailError, setEmailError] = useState(false);

	const checkForget = () => {
		if (!emailValid(auth.forgetForm.email)) {
			setEmailError(true);
		} else {
			forget();
		}
	};

	return (
		<FormBasic
			contentClassName={styles.formSignup}
			renderContent={() => (
				<>
					<div className={styles.title}>{t('forget')}</div>
					<InputField
						className={styles.bigMargin}
						title={t('mail')}
						placeholder={t('forgetMailPlaceholder')}
						type="text"
						value={auth.forgetForm.email}
						onChange={e => {
							updateForm({ type: 'forgetForm', key: 'email', value: e.target.value });
							setEmailError(false);
						}}
						error={emailError}
						errorText={t('mailFormatError')}
						mustFill
					/>
					<Button
						className={classnames(styles.singelBtn, styles.bigMargin)}
						textClassName={styles.text}
						onClick={checkForget}
						disabled={!auth.forgetForm.email}
					>
						{t('send')}
					</Button>
				</>
			)}
		/>
	);
};

interface FormAuthProperty extends ModalAuthComponentProperty {
	className?: string;
}

const FormAuth: React.FC<FormAuthProperty> = ({
	className,
	type: PropsType,
	updateForm,
	login,
	signup,
	forget,
	loginWithGoogle,
	loginWithFaceBook,
	auth,
}) => {
	return (
		<div className={classnames(styles.formAuth, className)}>
			{PropsType === 'login' && (
				<FormLogin
					auth={auth}
					updateForm={updateForm}
					login={login}
					loginWithGoogle={loginWithGoogle}
					loginWithFaceBook={loginWithFaceBook}
				/>
			)}
			{PropsType === 'signup' && (
				<FormSignup
					updateForm={updateForm}
					auth={auth}
					signup={signup}
					loginWithGoogle={loginWithGoogle}
					loginWithFaceBook={loginWithFaceBook}
				/>
			)}
			{PropsType === 'forget' && <FormForget updateForm={updateForm} auth={auth} forget={forget} />}
		</div>
	);
};

export default FormAuth;
