const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
    modules: [
      path.resolve('src'),
      'node_modules'
    ]
  },
  module: {
    rules: require('./webpack.rules')
  },
  plugins: [
    new MonacoWebpackPlugin()
  ]
}
