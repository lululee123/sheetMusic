import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ToggleButton from 'components/atoms/ToggleButton';

test('should have default value: Close', () => {
	const { container } = render(<ToggleButton onOpen={() => {}} onClose={() => {}} />);
	expect(container.firstChild.innerHTML).toMatch('Close');
});

// Create custom snapshot testing
test('should become Open after click', () => {
	const { container } = render(<ToggleButton onOpen={() => {}} onClose={() => {}} />);

	expect(container).toMatchSnapshot();

	// manually trigger the callback
	fireEvent.click(container.firstChild);

	expect(container.firstChild.innerHTML).toMatch('Open');
	// re-rendering would become Open
	expect(container).toMatchSnapshot();

	// manually trigger the callback
	fireEvent.click(container.firstChild);

	expect(container.firstChild.innerHTML).toMatch('Close');
	// re-rendering would become Close
	expect(container).toMatchSnapshot();
});
