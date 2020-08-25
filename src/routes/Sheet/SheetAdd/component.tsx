/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classnames from 'classnames';
import 'fabric-history';
import { fabric } from 'fabric';
import { uuid } from 'uuidv4';

import { useSheet, ImagesProperty } from 'models/sheet';
import { useAuth } from 'models/auth';

import OGIcon from 'images/toolsIcon/03-original.inline.svg';
import ZoomInIcon from 'images/toolsIcon/04-zoom-in.inline.svg';
import ZoomOutIcon from 'images/toolsIcon/05-zoom-out.inline.svg';
import LeftIcon from 'images/toolsIcon/left.inline.svg';
import RightIcon from 'images/toolsIcon/right.inline.svg';
import UndoIcon from 'images/toolsIcon/06-rotate-left.inline.svg';
import RedoIcon from 'images/toolsIcon/07-rotate-right.inline.svg';
import ImageIcon from 'images/icon/image.inline.svg';

import Fabric from 'layouts/Fabric';

import styles from './index.css';

interface ToolBarProperty {
	upload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
	pages: number;
	total: number;
	updataPage: (p: number) => void;
	zoomCanvas: (zoom: number | string) => void;
}

const ToolBar: React.FC<ToolBarProperty> = ({
	upload,
	pages,
	total,
	updataPage,
	zoomCanvas,
	fabricCanvas,
}) => {
	return (
		<div className={styles.toolBar}>
			<div className={styles.icons}>
				<button type="button" className={styles.toolButton} onClick={() => zoomCanvas('reset')}>
					<OGIcon />
				</button>
				<button type="button" className={styles.toolButton} onClick={() => zoomCanvas(0.1)}>
					<ZoomInIcon />
				</button>
				<button type="button" className={styles.toolButton} onClick={() => zoomCanvas(-0.1)}>
					<ZoomOutIcon />
				</button>
				<button type="button" className={styles.toolButton} onClick={() => fabricCanvas.undo()}>
					<UndoIcon />
				</button>
				<button type="button" className={styles.toolButton} onClick={() => fabricCanvas.redo()}>
					<RedoIcon />
				</button>
			</div>
			<div className={styles.pageInfo}>
				<button
					type="button"
					className={styles.toolButton}
					onClick={() => pages - 1 >= 0 && updataPage(pages - 1)}
				>
					<LeftIcon />
				</button>
				<div className={styles.pageNumber}>
					<div className={styles.pageNow}>{pages + 1}</div>
					<div className={styles.pageSlash}>/</div>
					<div className={styles.pagetotal}>{total}</div>
				</div>
				<button
					type="button"
					className={styles.toolButton}
					onClick={() => pages + 1 < total && updataPage(pages + 1)}
				>
					<RightIcon />
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

interface PageProperty {
	className?: string;
}

const SheetAddPage: React.FC<PageProperty> = ({ className }) => {
	const [id, updateId] = useState('');
	const [images, updateImages] = useState<{ [key: string]: ImagesProperty[] }>({});
	const [pages, updatePages] = useState(0);
	const [
		{
			sheet: { fabricCanvas, fabricCanvasParameters },
		},
		{ initFabric, updateFabricCanvasParameters, resetFabricCanvas, zoomCanvas },
	] = useSheet();
	const [, { updateUserData }] = useAuth();
	useEffect(() => {
		const generateId = uuid();
		updateId(generateId);
		updateImages({ [generateId]: [] });
	}, []);

	const renderCanvas = (data: ImagesProperty) => {
		fabricCanvas.clear();
		if (!data.canvas) {
			fabric.Image.fromURL(data.url, img => {
				const width = img.width || 0;
				const height = img.height || 0;
				updateFabricCanvasParameters({ key: 'imageOriginWidth', value: width });
				updateFabricCanvasParameters({ key: 'imageOriginHeight', value: height });
				updateFabricCanvasParameters({ key: 'proportion', value: width / height });
				img.set({
					selectable: false,
				});
				fabricCanvas.setZoom(fabricCanvasParameters.containerWidth / width);
				fabricCanvas.setWidth(fabricCanvasParameters.containerWidth);
				fabricCanvas.setHeight(height * (fabricCanvasParameters.containerWidth / width));
				fabricCanvas.add(img).renderAll();
				updateFabricCanvasParameters({
					key: 'baseScale',
					value: fabricCanvasParameters.containerWidth / width,
				});
			});
		} else {
			fabricCanvas.loadFromJSON(
				data.canvas,
				fabricCanvas.renderAll.bind(fabricCanvas),
				(
					_o: any,
					object: {
						width: number;
						height: number;
						set: (arg0: { selectable: boolean }) => void;
					},
				) => {
					updateFabricCanvasParameters({ key: 'imageOriginWidth', value: object.width });
					updateFabricCanvasParameters({ key: 'imageOriginHeight', value: object.height });
					updateFabricCanvasParameters({ key: 'proportion', value: object.width / object.height });
					object.set({
						selectable: false,
					});
					fabricCanvas.setZoom(fabricCanvasParameters.containerWidth / object.width);
					fabricCanvas.setWidth(fabricCanvasParameters.containerWidth);
					fabricCanvas.setHeight(
						object.height * (fabricCanvasParameters.containerWidth / object.width),
					);
					updateFabricCanvasParameters({
						key: 'baseScale',
						value: fabricCanvasParameters.containerWidth / object.width,
					});
				},
			);
		}
	};

	const handleImage = (image: any) => {
		return new Promise(resolve => {
			const picReader = new FileReader();
			picReader.onload = () => {
				resolve({ id: uuid(), url: picReader.result, canvas: '' });
			};
			picReader.readAsDataURL(image);
		});
	};

	const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		const uploadImages = { [id]: [] as any };
		updatePages(0);

		if (files) {
			for (let i = 0; i < files.length; i += 1) {
				const file = files[i];
				// eslint-disable-next-line no-await-in-loop
				const image = await handleImage(file);
				uploadImages[id].push(image);
			}
			updateImages(uploadImages);
		}
	};

	const updataPage = (p: number) => {
		const newImages = { [id]: [...images[id]] };
		newImages[id][pages].canvas = fabricCanvas.toJSON();
		updateImages(newImages);
		resetFabricCanvas();
		updatePages(p);
	};

	const save = () => {
		const newImages = { [id]: [...images[id]] };
		zoomCanvas('reset');
		newImages[id][pages].canvas = fabricCanvas.toJSON();
		updateUserData(images);
	};

	return (
		<div className={classnames(styles.sheetAdd, className)}>
			{id && images[id].length !== 0 && (
				<>
					<ToolBar
						upload={upload}
						pages={pages}
						total={images[id].length}
						updataPage={updataPage}
						zoomCanvas={zoomCanvas}
						fabricCanvas={fabricCanvas}
					/>
					<Fabric
						initFabric={initFabric}
						renderCanvas={renderCanvas}
						image={
							Object.keys(fabricCanvas).length !== 0
								? images[id][pages]
								: { id: 0, url: '', canvas: '' }
						}
						updateFabricCanvasParameters={updateFabricCanvasParameters}
					/>
					<div className={styles.results}>
						{images[id].map((image: ImagesProperty) => (
							<img key={image.id} src={image.url} alt={`${image.id}`} />
						))}
					</div>
					<button type="button" className={styles.save} onClick={save}>
						儲存
					</button>
				</>
			)}
			{id && images[id].length === 0 && (
				<div className={styles.uploadContainer}>
					<button type="button" className={styles.upload}>
						<ImageIcon />
						<label htmlFor="uploadFiles"> </label>
						<input
							id="uploadFiles"
							type="file"
							accept="image/jpg, image/jpeg, image/png"
							multiple
							onChange={upload}
						/>
						<div className={styles.title}>選擇檔案</div>
					</button>
				</div>
			)}
		</div>
	);
};

export default hot(SheetAddPage);
