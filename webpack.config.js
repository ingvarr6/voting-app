const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const outputPath = path.resolve(__dirname, './client/dist')

const webpackConfig = {
  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve(__dirname, './client/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, './client'),
    filename: '[name].js',
    publicPath: '/',
    crossOriginLoading: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './client/assets/index.html'),
      filename: 'index.html',
      path: outputPath
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
	public: 'you_url', 
    contentBase: path.resolve(__dirname, './dist'),
    port: process.env.PORT,
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: '0.0.0.0'
  }
}

module.exports = webpackConfig
