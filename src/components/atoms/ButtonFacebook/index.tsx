import React from 'react';
import classnames from 'classnames';

import FacebookIcon from 'images/icon/facebook.inline.svg';

import ButtonWithIcon from 'components/atoms/ButtonWithIcon';

import styles from './index.css';

interface ButtonFacebookProperty {
	className?: string;
	text?: string;
	onClick: () => void;
}

const ButtonFacebook: React.FC<ButtonFacebookProperty> = ({ className, text, onClick }) => {
	return (
		<ButtonWithIcon
			className={classnames(styles.buttonFacebook, className)}
			Icon={FacebookIcon}
			onClick={onClick}
		>
			{text}
		</ButtonWithIcon>
	);
};

export default ButtonFacebook;
