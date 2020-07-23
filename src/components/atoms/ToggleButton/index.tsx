import React from 'react';

import { useBoolean } from 'util/hook';

import style from './index.css';

interface ToggleButtonProperty {
	onClose: () => void;
	onOpen: () => void;
	closeTitle?: string;
	openTitle?: string;
}

const ToggleButton: React.FC<ToggleButtonProperty> = ({
	onClose,
	onOpen,
	closeTitle = 'Close',
	openTitle = 'Open',
}) => {
	const [isOpen, { toggle }] = useBoolean({
		onTrue: onOpen,
		onFalse: onClose,
		defaultBoolean: true,
	});

	return (
		<button type="button" className={toggle ? style.button : style.button} onClick={toggle}>
			{isOpen ? closeTitle : openTitle}
		</button>
	);
};

export default ToggleButton;
