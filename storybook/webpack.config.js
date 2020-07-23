/* eslint-disable @typescript-eslint/no-var-requires */

require('@babel/register');

const path = require('path');
const webpack = require('webpack');

const custom = require('../webpack.config').default;
const env = require('../config/env');
const endpoint = require('../config/endpoint');

const modifyRelativePath = fixPath => path.join(__dirname, '..', path.basename(fixPath));

module.exports = async ({ config }) => {
	return {
		...config,
		module: {
			...config.module,
			rules: [
				...config.module.rules.filter(rule => !rule.test.test('.css') && !rule.test.test('.svg')),
				...custom.module.rules.map(rule => {
					const newRule = {
						...rule,
						include: Array.isArray(rule.include)
							? rule.include.map(includePath => modifyRelativePath(includePath))
							: modifyRelativePath(rule.include),
					};

					if (newRule.loader === 'babel-loader') {
						newRule.options.plugins[1][1].root = ['../src'];
						newRule.options.plugins[1][1].alias = {
							components: './src/components',
							images: './src/images',
							layouts: './src/layouts',
							models: './src/models',
							routes: './src/routes',
							store: './src/store',
							util: './src/util',
						};
					}

					return newRule;
				}),
			],
		},
		plugins: [
			...config.plugins,
			new webpack.DefinePlugin({
				'process.env': { ...env, ...endpoint },
			}),
		],
		externals: {
			...config.externals,
			jsdom: 'window',
			cheerio: 'window',
			'react/lib/ExecutionEnvironment': true,
			'react/lib/ReactContext': 'window',
			'react/addons': true,
		},
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom',
			},
			extensions: ['.ts', '.tsx', '.js', 'jsx'],
		},
	};
};
