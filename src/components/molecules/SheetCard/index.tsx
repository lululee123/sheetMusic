import React from 'react';
import classnames from 'classnames';

import Link from 'components/atoms/Link';

import styles from './index.css';

interface SheetCardProperty {
	className?: string;
	to: string;
	thumbnail?: string;
}

const SheetCard: React.FC<SheetCardProperty> = ({ className, to, thumbnail }) => {
	return (
		<Link to={to}>
			<div className={classnames(styles.sheetCard, className)}>
				<img src={thumbnail} alt="icon" className={styles.image} />
			</div>
		</Link>
	);
};

export default SheetCard;
