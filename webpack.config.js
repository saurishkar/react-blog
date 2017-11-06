const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
			{ 	
				test: /\.(s*)css$/,
				use: ExtractTextPlugin.extract({ 
					fallback:'style-loader',
					use:['css-loader','sass-loader'],
				})
			},
			{ test: /\.(png|jpg|gif|svg)/, use: ['file-loader']},
		]
	},
	plugins: [
		new ExtractTextPlugin({filename:'app.bundle.css'}),
		new HtmlWebpackPlugin({ title: 'React Ecommerce App', template: './src/assets/index.html'}),
		new CleanWebpackPlugin(['build'])
	]
};