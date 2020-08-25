import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

import { useResize } from 'util/event';

import { UseFabric, UpdateFabricCanvasParametersActionState, ImagesProperty } from 'models/sheet';

import styles from './index.css';

interface OriCanvasProperty {
	className?: string;
	initFabric: (arg0: UseFabric) => void;
	renderCanvas: (arg0: any) => void;
	image: ImagesProperty;
	updateFabricCanvasParameters: (t1: UpdateFabricCanvasParametersActionState) => void;
}

const Fabric: React.FC<OriCanvasProperty> = ({
	className,
	initFabric,
	renderCanvas,
	image = { id: 0, url: '', canvas: '' },
	updateFabricCanvasParameters,
}) => {
	const refCanvas = useRef<HTMLCanvasElement>(null);
	const refContainer = useRef<HTMLDivElement>(null);
	const { width: windowWidth } = useResize();

	useEffect(() => {
		initFabric({
			canvasRef: refCanvas,
			width:
				refContainer.current && refContainer.current.clientWidth
					? refContainer.current.clientWidth
					: 0,
			height:
				refContainer.current && refContainer.current.clientHeight
					? refContainer.current.clientHeight
					: 0,
		});
	}, []);

	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		image.id && renderCanvas(image);
	}, [image]);

	useEffect(() => {
		updateFabricCanvasParameters({
			key: 'containerWidth',
			value:
				refContainer.current && refContainer.current.clientWidth
					? refContainer.current.clientWidth
					: 0,
		});
		updateFabricCanvasParameters({
			key: 'containerHeight',
			value:
				refContainer.current && refContainer.current.clientHeight
					? refContainer.current.clientHeight
					: 0,
		});
	}, [windowWidth]);

	return (
		<div className={classnames(styles.fabricCanvas, className)} ref={refContainer}>
			<canvas ref={refCanvas} />
		</div>
	);
};

export default Fabric;
