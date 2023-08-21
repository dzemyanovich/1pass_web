const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./webpack.shared');

module.exports = merge(config, {
  mode: 'production',
  devServer: {
    hot: false,
    liveReload: false,
    webSocketServer: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist_preprod'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ADMIN_API': JSON.stringify('https://hnoy06b8ll.execute-api.eu-central-1.amazonaws.com/preprod1'),
    }),
  ],
});
