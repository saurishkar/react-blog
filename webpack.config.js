const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'source-maps',
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader']},
			{ test: /\.(png|jpg|gif|svg)/, use: ['file-loader']},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ title: 'React Ecommerce App', template: './src/assets/index.html'}),
		new CleanWebpackPlugin(['build'])
	]
};