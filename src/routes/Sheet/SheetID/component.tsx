/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classnames from 'classnames';
import { fabric } from 'fabric';

import { useSheet } from 'models/sheet';

import HeightIcon from 'images/toolsIcon/01-height.inline.svg';
import WidthIcon from 'images/toolsIcon/02-width.inline.svg';
import ZoomInIcon from 'images/toolsIcon/04-zoom-in.inline.svg';
import ZoomOutIcon from 'images/toolsIcon/05-zoom-out.inline.svg';
import RotateLeftIcon from 'images/toolsIcon/06-rotate-left.inline.svg';
import RotateRightIcon from 'images/toolsIcon/07-rotate-right.inline.svg';
import LeftIcon from 'images/toolsIcon/left.inline.svg';
import RightIcon from 'images/toolsIcon/right.inline.svg';

import Fabric from 'layouts/Fabric';

import styles from './index.css';

interface ToolBarProperty {
	upload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
	pages: number;
	total: number;
}

const ToolBar: React.FC<ToolBarProperty> = ({ upload, pages, total }) => {
	return (
		<div className={styles.toolBar}>
			<div className={styles.icons}>
				<button type="button" className={styles.toolButton}>
					<HeightIcon />
				</button>
				<button type="button" className={styles.toolButton}>
					<WidthIcon />
				</button>
				<button type="button" className={styles.toolButton}>
					<ZoomInIcon />
				</button>
				<button type="button" className={styles.toolButton}>
					<ZoomOutIcon />
				</button>
				<button type="button" className={styles.toolButton}>
					<RotateLeftIcon />
				</button>
				<button type="button" className={styles.toolButton}>
					<RotateRightIcon />
				</button>
			</div>
			<div className={styles.pageInfo}>
				<button type="button" className={styles.toolButton}>
					<LeftIcon />
				</button>
				<div className={styles.pageNumber}>
					<div className={styles.pageNow}>{pages + 1}</div>
					<div className={styles.pageSlash}>/</div>
					<div className={styles.pagetotal}>{total}</div>
				</div>
				<button type="button" className={styles.toolButton}>
					<RightIcon />
				</button>
			</div>
			<button type="button" className={styles.reUpload}>
				<label htmlFor="reuploadFiles">選擇檔案</label>
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

interface PageProperty {
	className?: string;
}

interface ImagesProperty {
	id: number;
	url: string;
}

const SheetDetailPage: React.FC<PageProperty> = ({ className }) => {
	const [images, updateImages] = useState([]);
	const [pages, updatePages] = useState(0);
	const [
		{
			sheet: { sheetData, fabricCanvas, fabricCanvasParameters },
		},
		{ initFabric, updateFabricCanvasParameters },
	] = useSheet();

	const renderCanvas = (link: string) => {
		fabric.Image.fromURL(link, img => {
			const width = img.width || 0;
			const height = img.height || 0;
			updateFabricCanvasParameters({ key: 'imageOriginWidth', value: width });
			updateFabricCanvasParameters({ key: 'imageOriginHeight', value: height });
			updateFabricCanvasParameters({ key: 'proportion', value: width / height });
			img.set({
				selectable: false,
				scaleX: fabricCanvasParameters.containerWidth / width,
				scaleY: fabricCanvasParameters.containerWidth / width,
			});
			fabricCanvas.setWidth(fabricCanvasParameters.containerWidth);
			fabricCanvas.setHeight(height * (fabricCanvasParameters.containerWidth / width));
			fabricCanvas.add(img).renderAll();
		});
	};

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
		fabricCanvas.clear();
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

		renderCanvas(uploadImages[0].url);
	};

	return (
		<div className={classnames(styles.sheetDetail, className)}>
			<ToolBar upload={upload} pages={pages} total={images.length} />
			<Fabric
				fabricCanvas={fabricCanvas}
				initFabric={initFabric}
				sheetData={sheetData}
				updateFabricCanvasParameters={updateFabricCanvasParameters}
			/>
			<div className={styles.results}>
				{images.map((image: ImagesProperty) => (
					<img key={image.id} src={image.url} alt={`${image.id}`} />
				))}
			</div>
		</div>
	);
};

export default hot(SheetDetailPage);
