export const genComponentContent = _componentName =>
	`import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface ${_componentName}Property { }

const ${_componentName}: React.FC<${_componentName}Property> = ({ className }) => (
	<div className={classnames(styles.${_componentName.charAt(0).toLowerCase() +
		_componentName.slice(1)}, className)}>${_componentName}</div>
);

export default ${_componentName};
`;

export const genStyleContent = _componentName => {
	const transferClassName = oldName =>
		oldName
			.split('')
			.map((letter, index) => {
				if (letter !== letter.toLowerCase()) {
					if (index !== 0) {
						return `-${letter.toLowerCase()}`;
					}

					return letter.toLowerCase();
				}
				return letter;
			})
			.join('');

	return `.${transferClassName(_componentName)} {}\n`;
};

export const genStorybookContent = (_componentName, _scope) => {
	const requirementImportText = `import React from 'react';
import { storiesOf } from '@storybook/react';\n
`;

	const componentPosition = _scope === 'layout' ? 'layouts' : `components/${_scope}s`;
	const componentImportText = `import ${_componentName} from '${componentPosition}/${_componentName}';\n\n`;

	const storyContent = `const stories = storiesOf('${_scope}s/${_componentName}', module);

stories.add('__interactive', () => <${_componentName} />);
`;

	const storybookContent = requirementImportText + componentImportText + storyContent;

	return storybookContent;
};
