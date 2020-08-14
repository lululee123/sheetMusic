import React, { MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './index.css';

export interface ButtonProperty {
	className?: string;
	textClassName?: string;
	type?: 'normal' | 'outline' | 'link';
	disabled?: boolean;
	onClick?: (e: MouseEvent) => void;
	color?: string;
}

const Button: React.FC<ButtonProperty> = ({
	className,
	textClassName,
	type = 'normal',
	disabled = false,
	color = 'blue',
	children,
	onClick = () => {},
	...props
}) => (
	<button
		className={classnames(
			styles.button,
			styles.normal,
			className,
			{
				[styles.outline]: type === 'outline',
				[styles.link]: type === 'link',
				[styles.disabled]: disabled,
			},
			styles[color],
		)}
		type="button"
		onClick={e => {
			if (!disabled) {
				onClick(e);
			}
		}}
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...props}
	>
		<div className={classnames(styles.main, textClassName)}>
			<span>{children}</span>
		</div>
	</button>
);

export default Button;
