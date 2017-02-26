const path = require('path');
const webpack = require('webpack');

module.exports = function () {
    return {
        entry: {},
        output: {
            path: path.join(__dirname, '../', 'public', 'js'),
            publicPath: '/',
            filename: '[name].js'
        },
        resolve: {
            modules: [
                'src',
                'node_modules'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                            presets: ['es2015'],
                            plugins: ['syntax-async-functions', 'transform-regenerator']
                        }
                    },
                    exclude: /node_modules/,
                    include: path.join(__dirname, '../', 'src', 'client')
                }
            ]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin()
        ]
    };
}
