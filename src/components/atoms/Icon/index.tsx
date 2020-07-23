import React from 'react';
import classnames from 'classnames';

import { isExist } from 'util/helper';

import styles from './index.css';

interface IconProperty {
	className?: string;
	src: string;
	size?: 'normal' | 'small';
	onClick?: () => void;
}

const Icon: React.FC<IconProperty> = ({ className, src: Svg, size = 'normal', onClick }) => (
	<div
		className={classnames(styles.icon, className, isExist(size) && styles[size], {
			[styles.clickable]: isExist(onClick),
		})}
		role="button"
		tabIndex={0}
		onClick={onClick}
		onKeyPress={() => {}}
	>
		<Svg />
	</div>
);

export default Icon;
