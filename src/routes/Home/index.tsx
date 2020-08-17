import React from 'react';
import { hot } from 'react-hot-loader/root';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'models/auth';

import { changeLng } from 'util/i18n';

import Link from 'components/atoms/Link';
import LoadingHOC from 'components/organisms/LoadingHOC';
import SheetCard from 'components/molecules/SheetCard';

import styles from './index.css';

const Home: React.FC = () => {
	const { t } = useTranslation(['login', 'common']);
	const [
		{
			auth: { data: sheetData, loading },
		},
	] = useAuth();

	return (
		<LoadingHOC loading={loading}>
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
			<div className={styles.home}>
				{Object.keys(sheetData).length === 0 || sheetData.list.length === 0 ? (
					<div>{t('common:noData')}</div>
				) : (
					<div>
						{sheetData.list &&
							sheetData.list.map((data: { id: number; sheet: string }) => (
								<div key={data.id}>
									<SheetCard to={`/sheet/${data.id}`} thumbnail={data.sheet} />
								</div>
							))}
					</div>
				)}
			</div>
		</LoadingHOC>
	);
};

export default hot(Home);
