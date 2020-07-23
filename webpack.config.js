/* eslint-disable @typescript-eslint/camelcase */

import path from 'path';
import webpack from 'webpack';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import palette from './config/palette';
import media from './config/media';
import env from './config/env';
import endpoint from './config/endpoint';

export default {
	devtool: 'cheap-module-eval-source-map',
	mode: 'development',
	entry: {
		app: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/index.tsx'],
	},
	output: {
		path: path.join(__dirname, '_public'),
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': { ...env, ...endpoint },
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			chunksSortMode: 'dependency',
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					ecma: 5,
					compress: {
						warnings: false,
						comparisons: false,
					},
					output: {
						comments: false,
						ascii_only: false,
					},
				},
			}),
		],
		// Automatically split vendor and commons
		// https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
		runtimeChunk: 'single',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: path.join(__dirname, 'src'),
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', { loose: true, modules: false, useBuiltIns: 'usage', corejs: 3 }],
						'@babel/preset-react',
						'@babel/preset-typescript',
					],
					plugins: [
						'react-hot-loader/babel',
						[
							'module-resolver',
							{
								root: ['./src'],
								alias: {
									components: './src/components',
									images: './src/images',
									layouts: './src/layouts',
									models: './src/models',
									routes: './src/routes',
									store: './src/store',
									util: './src/util',
								},
							},
						],
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-syntax-import-meta',
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-json-strings',
						'@babel/plugin-transform-react-constant-elements',
					],
					babelrc: false,
				},
			},
			{
				test: /\.css$/,
				include: path.join(__dirname, 'src'),
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							localsConvention: 'camelCase',
							modules: {
								localIdentName: '[name]__[local]___[hash:base64:5]',
							},
							importLoaders: 1,
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
							plugins: () => [
								atImport(),
								postcssPresetEnv({
									stage: 0,
									importFrom: [
										{
											customMedia: media,
											customProperties: palette,
										},
									],
									preserve: false,
								}),
							],
						},
					},
				],
			},
			{
				test: /\.css$/,
				include: path.join(__dirname, 'node_modules'),
				use: ['style-loader', { loader: 'css-loader', options: { sourceMap: true } }],
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				include: path.join(__dirname, 'src'),
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: './assets/[name]__[hash].[ext]',
				},
			},
			{
				test: /^(?!.*\.inline\.svg$).*\.svg$/,
				include: path.join(__dirname, 'src'),
				use: [
					'@svgr/webpack',
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: './assets/[name]__[hash].[ext]',
						},
					},
				],
			},
			{
				test: /\.inline.svg$/,
				include: path.join(__dirname, 'src'),
				loader: '@svgr/webpack',
				options: {
					svgoConfig: {
						plugins: [{ cleanupIDs: false }, { removeViewBox: false }],
					},
				},
			},
		],
	},
	node: {
		fs: 'empty',
	},
	resolve: {
		modules: ['node_modules'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
		extensions: ['.ts', '.tsx', '.js'],
	},
};
