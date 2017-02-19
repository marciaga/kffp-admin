'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': ['babel-polyfill', './src/client', hotMiddlewareScript]
    },
    output: {
        path: path.join(__dirname, 'public', 'js'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015'],
                    plugins: ['syntax-async-functions', 'transform-regenerator']
                },
                include: path.resolve('..', __dirname)
            }
        ]
    }
};
