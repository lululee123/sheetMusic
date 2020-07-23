import React, { ChangeEvent } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import Error from 'images/icon/error.inline.svg';

import styles from './index.css';

interface InputProperty {
	className?: string;
	title?: string;
	placeholder?: string;
	type?: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	mustFill?: boolean;
	error?: boolean;
	errorText?: string;
}

const InputField: React.FC<InputProperty> = ({
	className,
	title = '',
	placeholder = '',
	type = 'text',
	value = '',
	onChange,
	mustFill = false,
	error = false,
	errorText = '',
}) => {
	const { t } = useTranslation(['auth']);
	return (
		<div className={classnames(styles.inputField, className)}>
			{(title || mustFill) && (
				<div className={styles.top}>
					<span className={styles.title}>{title}</span>
					{mustFill && <span className={styles.mustFill}>{t('mustFill')}</span>}
				</div>
			)}

			<input
				placeholder={placeholder}
				type={type}
				className={classnames(styles.input, error && styles.errorInput)}
				value={value}
				onChange={onChange}
			/>
			{error && (
				<div className={styles.errorBox}>
					<Error />
					<div className={styles.errorText}>{errorText}</div>
				</div>
			)}
		</div>
	);
};

export default InputField;
