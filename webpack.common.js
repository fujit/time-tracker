const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
  entry: `${src}/index.tsx`,

  output: {
    path: `${dist}`,
    filename: 'main.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.wasm', '.json', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          {
            loader: 'source-map-loader',
          },
        ],
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
