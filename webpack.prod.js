const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const src = path.resolve(__dirname, 'src')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: `${src}/production.html`,
  filename: 'index.html',
})

module.exports = merge(common, {
  mode: 'production',

  devServer: {
    historyApiFallback: true,
  },

  plugins: [htmlWebpackPlugin, new MiniCssExtractPlugin()],
})
