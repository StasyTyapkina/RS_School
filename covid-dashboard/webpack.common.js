const path = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: `bundle.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          // options: { attrs: ["img:src", "link:href"] }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              name: 'img//[name].[ext]',
              limit: 8192,
              /*fallback: require.resolve('responsive-loader'),
              quality: 85,*/
            },
          },
        ],
      },
    ],
  },
  devtool: `inline-source-map`,
};