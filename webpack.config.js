'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'app': ['babel-polyfill', './src/client', hotMiddlewareScript]
    },
    output: {
        path: path.join(__dirname, 'public', 'js'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src/client'],
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /node_modules/,

                query: {
                    cacheDirectory: true,
                    presets: ['es2015'],
                    plugins: ['syntax-async-functions', 'transform-regenerator']
                },
                include: path.resolve('..', __dirname)
            },
            {
                test: /\.json/,
                loader: 'json'
            }
        ]
    }
};
