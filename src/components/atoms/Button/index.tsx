import React, { MouseEvent } from 'react';
import classnames from 'classnames';

import { isExist } from 'util/helper';

import FeatherLarge from 'images/icon/feather-right-large.inline.svg';

import styles from './index.css';

enum SideType {
	left = 'left',
	right = 'right',
}

interface FeatherIconProperty {
	className?: string;
	size?: 'large' | 'normal' | 'small';
	outline?: boolean;
	disabled?: boolean;
	side?: SideType;
}

const FeatherIcon: React.FC<FeatherIconProperty> = ({
	className,
	size = 'normal',
	outline = false,
	disabled = false,
	side = SideType.right,
}) => (
	<div
		className={classnames(
			styles.featherIcon,
			className,
			{
				[styles.outline]: outline,
				[styles.disabled]: disabled,
			},
			isExist(size) && styles[size],
		)}
		style={{
			transform: side === SideType.left ? 'rotate(180deg)' : 'rotate(0deg)',
		}}
	>
		<FeatherLarge />
	</div>
);

export interface ButtonProperty {
	className?: string;
	textClassName?: string;
	type?: 'normal' | 'outline' | 'link';
	disabled?: boolean;
	feather?: boolean;
	size?: 'normal' | 'large' | 'small';
	onClick?: (e: MouseEvent) => void;
	color?: string;
}

const Button: React.FC<ButtonProperty> = ({
	className,
	textClassName,
	type = 'normal',
	disabled = false,
	feather = false,
	size = 'normal',
	color = 'blue',
	children,
	onClick = () => {},
	...props
}) => (
	<button
		className={classnames(
			styles.button,
			className,
			{
				[styles.outline]: type === 'outline',
				[styles.link]: type === 'link',
				[styles.disabled]: disabled && feather,
				[styles.feather]: feather,
				[styles.large]: size === 'large',
				[styles.normal]: size === 'normal',
				[styles.small]: size === 'small',
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
		{type !== 'link' && feather && (
			<FeatherIcon
				size={size}
				outline={type === 'outline'}
				disabled={disabled}
				side={SideType.left}
			/>
		)}
		<div className={classnames(styles.main, textClassName)}>
			<span>{children}</span>
		</div>
		{type !== 'link' && feather && (
			<FeatherIcon
				size={size}
				outline={type === 'outline'}
				disabled={disabled}
				side={SideType.right}
			/>
		)}
	</button>
);

export default Button;
