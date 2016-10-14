module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: './bin',
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
}
