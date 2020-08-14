import React, { MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface ButtonProperty {
	className?: string;
	Icon?: string;
	onClick?: (e: MouseEvent) => void;
}

const ButtonWithIcon: React.FC<ButtonProperty> = ({
	className,
	Icon,
	children,
	onClick = () => {},
}) => (
	<button className={classnames(styles.button, className)} type="button" onClick={onClick}>
		{Icon && <Icon />}
		<div className={styles.main}>
			<span>{children}</span>
		</div>
	</button>
);

export default ButtonWithIcon;
