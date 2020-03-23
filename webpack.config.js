const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = { //modulo para exportar
  entry: './src/index.js', //se hace referencia al archivo principal
  output: { //donde se van a guardar los archivos resultantes cuando se haga la compilacion
    path: path.resolve(__dirname, 'dist'), //donde se va a guardar...resolve detecta el archvo donde nos encontramos
    filename: 'bundle.js',
  },
  resolve: { //resolver las extensiones a utilizar en el proyecto
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpg|webp)$/,
        use: [
          {
            'loader': 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
};
