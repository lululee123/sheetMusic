/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import Link from 'components/atoms/Link';

import ImageIcon from 'images/icon/image.inline.svg';

import styles from './index.css';

const SheetCardAdd: React.FC = () => {
	return (
		<Link to="/sheet/add">
			<div className={styles.add}>
				<ImageIcon />
				<div className={styles.title}>選擇檔案</div>
			</div>
		</Link>
	);
};

export default SheetCardAdd;
