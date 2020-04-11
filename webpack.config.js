const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/frontend/index.js',

  output: {
    path: path.join(__dirname, 'dist', 'frontend'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      //tell process all javascript and jsx files with babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      title: "Webpack Output",
      template: "dist/frontend/index.html",
      inject: false
    }),
  ],

  // setup for the auto-refresh server
  devServer: {
    contentBase: './dist/frontend',
    open: true,
    historyApiFallback: true,
  }

}
