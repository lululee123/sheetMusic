import React, { useState, useEffect, ReactElement } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { CloseModalActionState } from 'models/modal';

import AlertIcon from 'images/icon/alert-triangle.inline.svg';
import CheckIcon from 'images/icon/circle-done-small.inline.svg';
import ErrorIcon from 'images/icon/error.inline.svg';

import Icon from 'components/atoms/Icon';
import Button from 'components/atoms/Button';
import { ModalAlertComponentProperty } from 'components/organisms/ModalAlert';

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
	text?: string;
	iconType?: string;
	closeModal?: (p: CloseModalActionState) => void;
	buttonAction?: (...args: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormWithIcon: React.FC<FormProperty> = ({
	iconType = '',
	buttonAction = () => {},
	closeModal = () => {},
	text,
}) => {
	const { t } = useTranslation(['alert']);

	return (
		<FormBasic
			contentClassName={styles.formIconAndWording}
			renderContent={() => (
				<>
					{iconType === 'success' && <Icon src={CheckIcon} />}
					{iconType === 'alert' && <Icon src={AlertIcon} />}
					{iconType === 'error' && <Icon src={ErrorIcon} />}
					<div className={styles.text}>{text}</div>
				</>
			)}
			footerClassName={styles.footer}
			renderFooter={() => (
				<>
					<Button
						type="link"
						onClick={() => {
							buttonAction();
							closeModal({ category: 'alert' });
						}}
					>
						{t('confirm')}
					</Button>
				</>
			)}
		/>
	);
};

interface FormAlertProperty extends ModalAlertComponentProperty {
	className?: string;
}

const FormAlert: React.FC<FormAlertProperty> = ({ className, type: PropsType, closeModal }) => {
	const { t } = useTranslation(['alert']);

	return (
		<div className={classnames(styles.formAlert, className)}>
			{(() => {
				if (PropsType === 'auth/email-already-in-use') {
					return (
						<FormWithIcon
							iconType="error"
							closeModal={closeModal}
							text={t('email-already-in-use')}
						/>
					);
				}

				if (PropsType === 'auth/invalid-email') {
					return (
						<FormWithIcon iconType="error" closeModal={closeModal} text={t('invalid-email')} />
					);
				}

				if (PropsType === 'auth/weak-password' || PropsType === 'auth/wrong-password') {
					return (
						<FormWithIcon iconType="error" closeModal={closeModal} text={t('weak-password')} />
					);
				}

				if (PropsType === 'resetMailSend') {
					return (
						<FormWithIcon iconType="success" closeModal={closeModal} text={t('resetMailSend')} />
					);
				}

				if (PropsType === 'resetMailSendFail') {
					return (
						<FormWithIcon iconType="error" closeModal={closeModal} text={t('resetMailSendFail')} />
					);
				}

				if (PropsType === 'auth/user-disabled' || PropsType === 'auth/user-not-found') {
					return (
						<FormWithIcon iconType="error" closeModal={closeModal} text={t('user-disabled')} />
					);
				}
				return <FormWithIcon iconType="error" closeModal={closeModal} text={t('fail')} />;
			})()}
		</div>
	);
};

export default FormAlert;
