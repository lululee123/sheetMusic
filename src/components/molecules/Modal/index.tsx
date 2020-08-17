import React, { useLayoutEffect, useRef, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated, config } from 'react-spring';
import classnames from 'classnames';

import styles from './index.css';

interface ModalComponentProperty {
	className?: string;
	active: boolean;
	onDeactivate?: () => void;
}

const ModalComponent: React.FC<ModalComponentProperty> = ({
	className,
	children,
	active = false,
	onDeactivate = () => {},
}) => {
	const transitions = useTransition(active, null, {
		from: { opacity: 0, transform: 'translateY(10px)' },
		enter: { opacity: 1, transform: 'translateY(0px)' },
		leave: { opacity: 0, transform: 'translateY(10px)' },
		config: config.stiff,
	});

	const handleClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			onDeactivate();
		}
	};

	return (
		<>
			{transitions.map(
				({ item, props, key }) =>
					item && (
						<animated.div
							key={key}
							className={classnames(styles.modal, className)}
							style={props}
							onClick={handleClick}
						>
							{children}
						</animated.div>
					),
			)}
		</>
	);
};

interface ModalProperty {
	className?: string;
	active: boolean;
	onDeactivate?: () => void;
}

const Modal: React.FC<ModalProperty> = ({ className, active, onDeactivate, children }) => {
	const refDiv = useRef(document.createElement('div'));

	useLayoutEffect(() => {
		let modalRoot = document.getElementById('modal-root');

		if (modalRoot === null) {
			modalRoot = document.createElement('div');
			modalRoot.setAttribute('id', 'modal-root');
			document.body.appendChild(modalRoot);
		}

		modalRoot.appendChild(refDiv.current);

		return () => {
			if (modalRoot) {
				modalRoot.removeChild(refDiv.current);
			}
		};
	}, []);

	return ReactDOM.createPortal(
		<ModalComponent className={className} active={active} onDeactivate={onDeactivate}>
			{children}
		</ModalComponent>,
		refDiv.current,
	);
};

export default Modal;
