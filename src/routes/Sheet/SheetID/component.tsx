/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classnames from 'classnames';

import HeightIcon from 'images/toolsIcon/01-height.inline.svg';
import Fabric from 'layouts/Fabric';

import styles from './index.css';

interface PageProperty {
	className?: string;
}

interface ImagesProperty {
	id: number;
	url: string;
}

const ToolBar: React.FC = () => {
	return (
		<div className={styles.toolBar}>
			<button type="button" className={styles.toolButton}>
				<img src={HeightIcon} alt="icon" />
			</button>
			<button type="button" className={styles.toolButton}>
				<img src="../../images/02-width.svg" alt="icon" />
			</button>
			<button type="button" className={styles.toolButton}>
				<img src="../../images/04-zoom-in.svg" alt="icon" />
			</button>
			<button type="button" className={styles.toolButton}>
				<img src="../../images/05-zoom-out.svg" alt="icon" />
			</button>
			<button type="button" className={styles.toolButton}>
				<img src="../../images/06-rotate-left.svg" alt="icon" />
			</button>
			<button type="button" className={styles.toolButton}>
				<img src="../../images/07-rotate-right.svg" alt="icon" />
			</button>
			<button type="button" className={styles.toolButton}>
				<img src="../../images/08-fit.svg" alt="icon" />
			</button>
			<div className={styles.pageInfo}>
				<button type="button" className={styles.toolButton}>
					<img src="../../images/left.svg" alt="icon" />
				</button>
				<div className={styles.pageNumber}>
					<div className={styles.pageNow} />
					<div className={styles.pageSlash}>/</div>
					<div className={styles.pagetotal} />
				</div>
				<button type="button" className={styles.toolButton}>
					<img src="../../images/right.svg" alt="icon" />
				</button>
			</div>
			<button type="button" className={styles.reUpload}>
				<label htmlFor="reuploadFiles">重新上傳</label>
				<input
					id="reuploadFiles"
					type="file"
					accept="image/jpg, image/jpeg, image/png"
					multiple
					onChange={upload}
				/>
			</button>
		</div>
	);
};

const SheetDetailPage: React.FC<PageProperty> = ({ className }) => {
	const [images, updateImages] = useState([]);
	const [pages, updatePages] = useState(0);

	const handleImage = (image: any, index: number) => {
		return new Promise(resolve => {
			const picReader = new FileReader();
			picReader.onload = () => {
				resolve({ id: index, url: picReader.result });
			};
			picReader.readAsDataURL(image);
		});
	};

	const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		const uploadImages = [] as any;
		updatePages(0);

		if (files) {
			for (let i = 0; i < files.length; i += 1) {
				const file = files[i];
				// eslint-disable-next-line no-await-in-loop
				const image = await handleImage(file, i);
				uploadImages.push(image);
			}
			updateImages(uploadImages);
		}
	};

	return (
		<div className={classnames(styles.sheetDetail, className)}>
			<ToolBar />
			<Fabric />
			<div className={styles.results}>
				{images.map((image: ImagesProperty) => (
					<img key={image.id} src={image.url} alt={`${image.id}`} />
				))}
			</div>
		</div>
	);
};

export default hot(SheetDetailPage);
