const path = require('path')
const webpack = require('webpack');
const html = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    optimization: {
        minimize: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|svg|jpeg)$/,
                loader:'file-loader',
                options:{
                    name: '[name].[ext]'
                },
            }
        ]
    },

    mode: 'development',
    devtool: 'source-map',

    entry: {
        main: [
            './index.js',
            './src/style.css'
        ],
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        assetModuleFilename: '[name][ext]'
    },
    devServer: {
        static: './build'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new html({
            template: 'index.html',
            chunks: [ 'main' ]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]
} 