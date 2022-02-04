const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dev = process.env.NODE_ENV !== "production";
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );

const plugins = [
  new FriendlyErrorsWebpackPlugin()
];

let nodeModules = {};

module.exports = () => {
    return {
        mode: dev?'development':'production',
        entry: "./index.ts",
        devtool: "inline-source-map",
        output: {
            libraryTarget: "umd",
            auxiliaryComment: "Logger Test",
            library: "logger",
            path: __dirname + "/dist",
            filename: "index.js",
        },
        resolve: {
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        },
        optimization: {
            minimizer: [new UglifyJsPlugin({
              test: /\.ts(\?.*)?$/i
            })],
          },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }, ],
        },
        target: 'node',
        node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
        },
        plugins,
        externals: [nodeExternals()]
    };
};