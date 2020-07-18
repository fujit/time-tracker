const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const src = path.resolve(__dirname, 'src')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: `${src}/production.html`,
  filename: 'index.html',
})

module.exports = merge(common, {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  mode: 'production',
  plugins: [htmlWebpackPlugin, new MiniCssExtractPlugin()],
})
