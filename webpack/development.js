const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const mainEntry = require('./common.js');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

mainEntry.push(hotMiddlewareScript);

module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        entry: {
            'app': mainEntry
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            })
        ]
    })
}
