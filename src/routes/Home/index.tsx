import React from 'react';
import { hot } from 'react-hot-loader/root';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'models/auth';

import { changeLng } from 'util/i18n';

import Link from 'components/atoms/Link';

import styles from './index.css';

const Home: React.FC = () => {
	const { t } = useTranslation(['login', 'common']);
	const [
		{
			auth: { data: sheetData },
		},
	] = useAuth();
	console.log(sheetData);
	return (
		<div className={styles.home}>
			{Object.keys(sheetData).length === 0 ? (
				<div>{t('common:noData')}</div>
			) : (
				<div>
					{sheetData.list &&
						sheetData.list.map(data => (
							<div key={data.id}>
								<img src={data.sheet} alt="icon" />
							</div>
						))}
				</div>
			)}
			{/* <button
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
			</button> */}
		</div>
	);
};

export default hot(Home);
