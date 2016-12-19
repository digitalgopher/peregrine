'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, 'src/js/index.js'),
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [
            {
                 test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot"],
            },
            // {
            //     test: /\.html$/,
            //     loader: "file?name=[name].[ext]"
            // },  
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				},
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"],
                // loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    
    devServer: {
        proxy: {
        '/api': {
            target: 'http://localhost:3000',
            secure: false
        }
        }
    }
    
};