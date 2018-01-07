const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
	// Inform webpack that we're building a bundle
	// for nodeJS, rather than for the browser
	target: 'node',

	// Tell webpack the root file of our server application
	entry: './src/index.js',

	// Tell webpack where to put the output file that is generated
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	// stops webpack from adding anything from node modules into the bundle.js
	// as we don't need to do this on the server side.
	externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);