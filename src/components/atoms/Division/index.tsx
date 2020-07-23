import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface DivisionProperty {
	className?: string;
	vertical?: boolean;
}

const Division: React.FC<DivisionProperty> = ({ className, vertical = false }) => (
	<div className={classnames(styles.division, className, { [styles.vertical]: vertical })} />
);

export default Division;
