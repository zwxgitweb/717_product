const config = require('./webpack.base');
const webpack = require('webpack');

// let UglifyPlugin = webpack.optimize.UglifyJsPlugin;
// let DefinePlugin = webpack.DefinePlugin;

// config.plugins.push(new UglifyPlugin());
// config.plugins.push(new DefinePlugin({
//     "process.env": "development"
// }))
module.exports = {
    ...config
}