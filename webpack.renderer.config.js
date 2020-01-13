const path = require('path')

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: require('./webpack.rules')
  }
}
