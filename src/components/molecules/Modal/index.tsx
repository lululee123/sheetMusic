import React, { useLayoutEffect, useRef, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import {
	useTransition,
	animated,
	config,
	SpringConfig,
	AnimationResult,
	TransitionState,
	UnknownProps,
} from 'react-spring';
import classnames from 'classnames';

import styles from './index.css';

interface ModalComponentProperty {
	className?: string;
	active: boolean;
	config?: SpringConfig;
	onDeactivate?: () => void;
	onRest?: (result: AnimationResult<UnknownProps>, transition: TransitionState) => void;
}

const ModalComponent: React.FC<ModalComponentProperty> = ({
	className,
	children,
	active = false,
	config: propsConfig = config.stiff,
	onDeactivate = () => {},
	onRest = () => {},
}) => {
	const transition = useTransition(active, {
		from: { opacity: 0, transform: 'translateY(10px)' },
		enter: { opacity: 1, transform: 'translateY(0px)' },
		leave: { opacity: 0, transform: 'translateY(10px)' },
		onRest,
		config: propsConfig,
	});

	const handleClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			onDeactivate();
		}
	};

	return (
		<>
			{transition(
				(values, item) =>
					item && (
						<animated.div
							className={classnames(styles.modal, className)}
							style={values}
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
	config?: SpringConfig;
	onDeactivate?: () => void;
	onRest?: (result: AnimationResult<UnknownProps>, transition: TransitionState) => void;
}

const Modal: React.FC<ModalProperty> = ({
	className,
	active,
	config: propsConfig,
	onDeactivate,
	onRest,
	children,
}) => {
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
		<ModalComponent
			className={className}
			active={active}
			config={propsConfig}
			onDeactivate={onDeactivate}
			onRest={onRest}
		>
			{children}
		</ModalComponent>,
		refDiv.current,
	);
};

export default Modal;
