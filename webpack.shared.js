const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|j?g|svg|gif|woff|otf)?$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
  ],
  performance: {
    maxEntrypointSize: 358400, // 350 KiB
    maxAssetSize: 358400, // 350 KiB
  },
};
