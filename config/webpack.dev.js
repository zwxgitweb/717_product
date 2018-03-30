const config = require('./webpack.base');
const webpack = require('webpack');

// let DefinePlugin = webpack.DefinePlugin;
// config.plugins.push(new DefinePlugin({
//     "process.env": "development"
// }))

module.exports = {
    ...config,
    devServer: {
        port: 3000,
        historyApiFallback: true,
        inline: true
    },
    devtool: 'eval-source-map'
}