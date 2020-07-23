import React from 'react';
import classnames from 'classnames';
import { hot } from 'react-hot-loader/root';

import { useTranslation } from 'react-i18next';

import styles from './index.css';

const NotSupportPage: React.FC = () => {
	const { t } = useTranslation(['common']);

	return (
		<div className={classnames(styles.notSupportPage)}>
			{t('notSupport')}
		</div>
	);
};

export default hot(NotSupportPage);
