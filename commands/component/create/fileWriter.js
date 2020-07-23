import fs from 'fs';
import path from 'path';
import colors from 'colors/safe';

import { genComponentContent, genStyleContent, genStorybookContent } from './contentGenerator';

export const createComponentFiles = async ({ name, scope, storybook }) => {
	const componentName = name.charAt(0).toUpperCase() + name.slice(1);
	const scopeDestination =
		scope !== 'layout'
			? path.join(__dirname, '..', '..', '..', 'src', 'components', `${scope}s`)
			: path.join(__dirname, '..', '..', '..', 'src', 'layouts');
	const componentFolder = path.join(scopeDestination, componentName);

	// check component exist
	try {
		const fileExist = await fs.existsSync(componentFolder);

		if (fileExist) {
			throw new Error('COMPONENT_EXIST');
		}
	} catch (err) {
		if (err.message === 'COMPONENT_EXIST') {
			console.error(colors.red(`COMPONENT_EXIST: ${scope}s/${componentName}`));
		} else {
			console.log(err);
		}
		return;
	}

	// create component
	fs.mkdir(componentFolder, () => {
		const componentContent = genComponentContent(componentName);

		// create index.js
		const indexFile = path.join(componentFolder, 'index.tsx');
		const indexWriteStream = fs.createWriteStream(indexFile);

		indexWriteStream.write(componentContent);

		indexWriteStream.end();

		indexWriteStream.on('finish', () => {
			console.log('index.tsx 建立完成');
		});

		// create index.css
		const styleContent = genStyleContent(componentName);
		const styleFile = path.join(componentFolder, 'index.css');
		const styleWriteStream = fs.createWriteStream(styleFile);
		styleWriteStream.write(styleContent);
		styleWriteStream.end();

		styleWriteStream.on('finish', () => {
			console.log('index.css 建立完成');
		});

		// create storybook test
		if (storybook) {
			const testFolder = path.join(componentFolder, '__tests__');

			fs.mkdir(testFolder, () => {
				const storybookContent = genStorybookContent(componentName, scope);

				const storybookFile = path.join(testFolder, `${componentName}.stories.js`);
				const storybookWriteStream = fs.createWriteStream(storybookFile);

				storybookWriteStream.write(storybookContent);
				storybookWriteStream.end();

				storybookWriteStream.on('finish', () => {
					console.log('storybook 建立完成');
				});
			});
		}
	});
};
