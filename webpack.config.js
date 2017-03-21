const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        test: path.resolve(__dirname, './test/test.js')
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
            }
        }]
    },
    target: "web"
};