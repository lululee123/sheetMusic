import { render } from '@testing-library/react';

const createSnapshot = (name, story) => {
	it(name, () => {
		const { asFragment } = render(story);

		expect(asFragment()).toMatchSnapshot();
	});
};

export const storiesOf = function storiesOf() {
	const api = {};
	let story;

	api.add = (name, func, { ignoreTest } = { ignoreTest: false }) => {
		if (!ignoreTest) {
			story = func();
			createSnapshot(name, story);
		} else {
			it(name, () => {});
		}
		return api;
	};

	api.addWithInfo = (name, func) => {
		story = func();
		createSnapshot(name, story);
		return api;
	};

	api.addDecorator = () => {};

	return api;
};
