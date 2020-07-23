import { addDecorator, configure, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { themes, create } from '@storybook/theming';
import { withTests } from '@storybook/addon-jest';

import 'normalize.css';
import '../src/global.css';

import { withRedux } from '../src/util/storybook-redux/decorator';

import results from '../.jest-test-results.json';

addDecorator(withKnobs);
addDecorator(withTests({ results }));
addDecorator(withRedux);

const { SELF_HOST_ENDPOINT } = process.env;

const customTheme = create({
	base: 'dark',
	brandTitle: '25sprout react starter',
	brandUrl: SELF_HOST_ENDPOINT,
});

addParameters({
	options: {
		theme: customTheme,
		hierarchySeparator: /\/|\./,
		hierarchyRootSeparator: /\|/,
	},
	backgrounds: [
		{ name: 'light', value: themes.light.appBg, default: true },
		{ name: 'dark', value: themes.dark.appBg, default: true },
	],
});

const req = require.context('../src/components/', true, /stories\.(ts|tsx)$/);

function loadStories() {
	req.keys().forEach(req);
}
configure(loadStories, module);
