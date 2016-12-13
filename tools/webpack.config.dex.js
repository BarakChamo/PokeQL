var DEV = process.env.NODE_ENV === 'production'
var path = require('path')

module.exports = {
  entry: './app/index.jsx',
  devServer: {
    inline: !DEV,
  },
  output: {
    path: path.join(__dirname, '../', 'bin'),
    publicPath: '/bin/',
    filename: 'app.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }],
  },
}
