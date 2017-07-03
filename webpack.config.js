var webpack = require('webpack');
var path = require('path');

var BUILD_DIR_REACT = path.resolve(__dirname, 'build/react');
var APP_DIR_REACT = path.resolve(__dirname, 'src/react');
var APP_DIR_ASSETS = path.resolve(__dirname, 'src/assets');
module.exports = {
    entry: APP_DIR_REACT + '/index.jsx',
    output: {
        path: BUILD_DIR_REACT,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'

            },
            {
                test: /\.less?/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&sourceMap=true&localIdentName=[name]__[local]!less-loader?sourceMap=true'
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            },
            {
                test: /\.jpg$/,
                loader: "url-loader",
                query: { mimetype: "image/jpeg" }
            }
        ]
    },
    resolve: {
        mainFields: ["main", "webpack", "browser", "web", "browserify", ["jam", "main"]],
        mainFields: ["main", "webpack", "browser", "web", "browserify", ["jam", "main"]]
    }
};