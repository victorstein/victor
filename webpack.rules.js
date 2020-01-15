module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    exclude: /(.webpack|node_modules)/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    loaders: [
      {
        loader: 'babel-loader'
      }
    ]
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  },
  {
    test: /\.(woff|woff2|eot|ttf|gif|png|jpg|svg)$/,
    loader: 'url-loader',
    options: {
      name: '[path][name].[ext]',
      esModule: false
    }
  }
]
