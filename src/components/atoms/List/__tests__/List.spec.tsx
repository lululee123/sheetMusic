import React from 'react';
import { render } from '@testing-library/react';

import List from 'components/atoms/List';

const items = [
	{
		key: 1,
		value: 'Lee',
	},
	{
		key: 2,
		value: 'Mike',
	},
];

test('should have items property', () => {
	const { getByTestId } = render(<List items={items} />);

	expect(getByTestId('1')).toHaveTextContent('Lee');
});
