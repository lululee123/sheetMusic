import React from 'react';
import classnames from 'classnames';

import Loading from 'components/atoms/Loading';

import styles from './index.css';

interface LoadingHOCProperty {
	className?: string;
	loading?: boolean;
	emptyItem?: boolean;
}

const LoadingHOC: React.FC<LoadingHOCProperty> = ({
	className,
	loading = false,
	emptyItem = false,
	children,
}) => (
	<div className={classnames(styles.homeGroup, className)}>
		{loading && <Loading />}
		{!loading && !emptyItem && children}
	</div>
);

export default LoadingHOC;
