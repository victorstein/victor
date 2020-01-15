const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/main.ts',
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, 'public/splash'),
          to: path.resolve(__dirname, '.webpack/renderer/splash')
        }
      ]
    )
  ],
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  }
}
