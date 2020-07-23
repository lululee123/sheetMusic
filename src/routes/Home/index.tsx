import React from 'react';
import { hot } from 'react-hot-loader/root';

import { useTranslation } from 'react-i18next';

import { changeLng } from 'util/i18n';

import Link from 'components/atoms/Link';

import styles from './index.css';

const Home: React.FC = () => {
	const { t } = useTranslation(['login']);

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					changeLng('en');
				}}
			>
				英文
			</button>
			<button
				type="button"
				onClick={() => {
					changeLng('zh');
				}}
			>
				中文
			</button>
			<Link to="login">{t('login')}</Link>
		</div>
	);
};

export default hot(Home);
