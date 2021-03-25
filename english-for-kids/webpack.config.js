const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index_import.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                "loose": true
              }]
            ],
            plugins: [
                  "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  
 
}
