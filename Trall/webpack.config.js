/*jshint esversion: 6*/

const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'assets/js'),
    entry: {
        app: './app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    }
};