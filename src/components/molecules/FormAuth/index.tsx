import React, { useState, useEffect, ReactElement } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { emailValid, passwordValid } from 'util/helper';

import ButtonGoogle from 'components/atoms/ButtonGoogle';
import ButtonFacebook from 'components/atoms/ButtonFacebook';
import Division from 'components/atoms/Division';
import InputField from 'components/atoms/InputField';
import Button from 'components/atoms/Button';
import Link from 'components/atoms/Link';

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

}

interface FormLoginProperty extends FormProperty {

}

const FormLogin: React.FC<FormLoginProperty> = ({
	
}) => {
	const { t } = useTranslation(['auth']);
	const [emailError, setEmailError] = useState(false);
	const checkLogin = () => {
		if (!emailValid(auth.loginForm.email)) {
			setEmailError(true);
		} else {
			Login();
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
							onClick={loginGoogle}
						/>
						<ButtonFacebook
							className={styles.socialButton}
							text={`Facebook ${t('login')}`}
							onClick={loginFacebook}
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
						feather
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
						<button
							onClick={() => {
								openModal({ category: 'auth', type: 'forget' });
								closeModal({ category: 'alert' });
							}}
							type="button"
						>
							{`${t('forget')}?`}
						</button>
					</div>
					<div className={classnames(styles.loginFootMargin, styles.item)}>
						{`${t('noAccount')} `}
						<button
							onClick={() => {
								openModal({ category: 'auth', type: 'signup' });
								closeModal({ category: 'alert' });
							}}
							type="button"
						>
							{t('signup')}
						</button>
					</div>
				</>
			)}
		/>
	);
};

interface FormSignupProperty extends FormProperty {
	Signup: () => void;
	openModal: (p: OpenModalActionState) => void;
	closeModal: (p: CloseModalActionState) => void;
	loginGoogle: () => void;
	loginFacebook: () => void;
}

const FormSignup: React.FC<FormSignupProperty> = ({
	updateForm,
	auth,
	Signup,
	openModal,
	closeModal,
	loginGoogle,
	loginFacebook,
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
			Signup();
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
							onClick={loginGoogle}
						/>
						<ButtonFacebook
							className={styles.socialButton}
							text={`Facebook ${t('signup')}`}
							onClick={loginFacebook}
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
						feather
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
					<button
						onClick={() => {
							openModal({ category: 'auth', type: 'login' });
							closeModal({ category: 'alert' });
						}}
						type="button"
					>
						{t('login')}
					</button>
				</div>
			)}
		/>
	);
};

interface FormResetPasswordProperty extends FormProperty {
	Reset: () => void;
}

const FormResetPassword: React.FC<FormResetPasswordProperty> = ({ updateForm, auth, Reset }) => {
	const { t } = useTranslation(['auth']);
	const [passwordError, setPasswordError] = useState({ status: false, text: '' });
	const checkReset = () => {
		if (!passwordValid(auth.resetForm.newPassword)) {
			setPasswordError({ status: true, text: `${t('passwordFormatError')}` });
		} else if (auth.resetForm.newPassword !== auth.resetForm.repeatPassword) {
			setPasswordError({ status: true, text: `${t('notSame')}` });
		} else {
			Reset();
		}
	};

	return (
		<FormBasic
			contentClassName={styles.formSignup}
			renderContent={() => (
				<>
					<div className={styles.title}>{t('reset')}</div>
					<InputField
						className={styles.bigMargin}
						title={t('resetPassword')}
						placeholder={t('passwordPlaceholder')}
						type="password"
						value={auth.resetForm.newPassword}
						onChange={e => {
							updateForm({ type: 'resetForm', key: 'newPassword', value: e.target.value });
							setPasswordError({ status: false, text: '' });
						}}
						error={passwordError.status}
						errorText={passwordError.text}
						mustFill
					/>
					<InputField
						className={styles.smallMargin}
						title={t('confirmPassword')}
						placeholder={t('confirmPasswordPlaceholder')}
						type="password"
						value={auth.resetForm.repeatPassword}
						onChange={e => {
							updateForm({ type: 'resetForm', key: 'repeatPassword', value: e.target.value });
							setPasswordError({ status: false, text: '' });
						}}
						mustFill
					/>
					<Button
						className={classnames(styles.singelBtn, styles.bigMargin)}
						textClassName={styles.text}
						feather
						onClick={checkReset}
						disabled={!(auth.resetForm.newPassword && auth.resetForm.repeatPassword)}
					>
						{t('confirm')}
					</Button>
				</>
			)}
		/>
	);
};

interface FormForgetProperty extends FormProperty {
	Forget: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormForget: React.FC<FormForgetProperty> = ({ auth, updateForm, Forget }) => {
	const { t } = useTranslation(['auth']);
	const [emailError, setEmailError] = useState(false);
	const [btnDisable, setBtnDisable] = useState(false);

	const checkForget = async () => {
		if (!emailValid(auth.forgotForm.email)) {
			setEmailError(true);
		} else {
			const {
				value: { success },
			} = await Forget();

			// if forget email send successfully, set button disable
			if (success) {
				setBtnDisable(true);
			}
		}
	};

	useEffect(() => {
		let timeout: number;

		if (btnDisable) {
			timeout = window.setTimeout(() => {
				setBtnDisable(false);
			}, 180000);
		}

		return () => window.clearTimeout(timeout);
	}, [btnDisable]);

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
						value={auth.forgotForm.email}
						onChange={e => {
							updateForm({ type: 'forgotForm', key: 'email', value: e.target.value });
							setEmailError(false);
						}}
						error={emailError}
						errorText={t('mailFormatError')}
						mustFill
					/>
					<Button
						className={classnames(styles.singelBtn, styles.bigMargin)}
						textClassName={styles.text}
						feather
						onClick={checkForget}
						disabled={!auth.forgotForm.email ? true : !!btnDisable}
					>
						{t('send')}
					</Button>
				</>
			)}
		/>
	);
};

interface FormAuthProperty {
	className?: string;
	type: string;
}

const FormAuth: React.FC<FormAuthProperty> = ({
	className,
	type: PropsType,
}) => {
	return (
		<div className={classnames(styles.formAuth, className)}>
			{PropsType === 'login' && (
				<FormLogin />
			)}
			{/* {PropsType === 'signup' && (
				<FormSignup
					updateForm={updateForm}
					auth={auth}
					Signup={Signup}
					openModal={openModal}
					closeModal={closeModal}
					loginFacebook={loginFacebook}
					loginGoogle={loginGoogle}
				/>
			)}
			{PropsType === 'forget' && <FormForget updateForm={updateForm} auth={auth} Forget={Forget} />} */}
		</div>
	);
};

export default FormAuth;
