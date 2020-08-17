import { useState, useEffect, useRef } from 'react';

export const useMedia = () => {
	const mobileMedia = window.matchMedia('(max-width: 1023px)');
	const desktopMedia = window.matchMedia('(min-width: 1024px)');

	let defaultMedia = 'desktop';

	if (mobileMedia.matches) {
		defaultMedia = 'mobile';
	}

	const [media, setMedia] = useState(defaultMedia);

	const handleMediaChange = (mediaName: string) => (mediaHandler: MediaQueryListEventInit) => {
		if (mediaHandler.matches && mediaName !== media) {
			setMedia(mediaName);
		}
	};

	useEffect(() => {
		const mobileHandler = handleMediaChange('mobile');
		const desktopHandler = handleMediaChange('desktop');

		mobileMedia.addListener(mobileHandler);
		desktopMedia.addListener(desktopHandler);

		return () => {
			mobileMedia.removeListener(mobileHandler);
			desktopMedia.removeListener(desktopHandler);
		};
	}, [media]);

	return media;
};

interface EventHandlers {
	[key: string]: EventListenerOrEventListenerObject;
}

// Handle the Dom event
export const useDom = (eventHandlers: EventHandlers) => {
	// Only subscribe/unsubscribe on mount/unmount lifecycle
	useEffect(() => {
		Object.keys(eventHandlers).forEach(event =>
			window.addEventListener(event, eventHandlers[event]),
		);

		return () => {
			Object.keys(eventHandlers).forEach(event =>
				window.removeEventListener(event, eventHandlers[event]),
			);
		};
	}, []);
};

export const useResize = () => {
	const { clientWidth, clientHeight } = document.documentElement;

	const [size, setState] = useState({ width: clientWidth, height: clientHeight });
	const preventTrigger = useRef(false);

	const resizeEvent = () => {
		if (!preventTrigger.current) {
			window.requestAnimationFrame(() => {
				setState({
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight,
				});
				preventTrigger.current = false;
			});
		}
		preventTrigger.current = true;
	};

	useDom({ resize: resizeEvent });

	return size;
};
