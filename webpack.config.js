var webpack = require('webpack');
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'public', 'js')
    },
    entry: {
        'content': './src/js/content.js',
        'background': './src/js/background.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]

    }
};