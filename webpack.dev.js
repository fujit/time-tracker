const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const src = path.resolve(__dirname, 'src')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: `${src}/development.html`,
  filename: 'index.html',
  showErrors: true,
})

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
  },

  plugins: [htmlWebpackPlugin, new MiniCssExtractPlugin()],
})
