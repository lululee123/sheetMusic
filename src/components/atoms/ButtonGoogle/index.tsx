import React from 'react';
import classnames from 'classnames';

import GoogleIcon from 'images/icon/google.inline.svg';

import ButtonWithIcon from 'components/atoms/ButtonWithIcon';

import styles from './index.css';

interface ButtonGoogleProperty {
	className?: string;
	text?: string;
	onClick: () => void;
}

const ButtonGoogle: React.FC<ButtonGoogleProperty> = ({ className, text, onClick }) => {
	return (
		<ButtonWithIcon
			className={classnames(styles.buttonGoogle, className)}
			Icon={GoogleIcon}
			onClick={onClick}
		>
			{text}
		</ButtonWithIcon>
	);
};

export default ButtonGoogle;
