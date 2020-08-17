import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import { useSheet } from 'models/sheet';

import { useResize } from 'util/event';

import styles from './index.css';

interface OriCanvasProperty {
	className?: string;
}

const Fabric: React.FC<OriCanvasProperty> = ({ className }) => {
	const [
		{
			sheet: { fabricCanvas },
		},
		{ initFabric },
	] = useSheet();
	const refCanvas = useRef(null);
	const refContainer = useRef(null);
	const { width: windowWidth } = useResize();
	console.log(windowWidth);

	useEffect(() => {
		initFabric({
			canvasRef: refCanvas, width: refContainer.current.clientWidth, height: refContainer.current.clientHeight
		});

		return () => {
			fabricCanvas.dispose();
		};
	}, []);

	return (
		<div className={classnames(styles.fabricCanvas, className)} ref={refContainer}>
			<Scrollbars style={{ width: '100%', height: '100%' }}>
				<canvas ref={refCanvas} />
			</Scrollbars>
		</div>
	);
};

export default Fabric;
