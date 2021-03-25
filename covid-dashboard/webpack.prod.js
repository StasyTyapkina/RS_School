const path = require('path');
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge (common, {
    mode: `production`,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: `bundle.js`
    },
    module: {
      rules: [
        {
            test: /\.(sass|scss)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
             'css-loader', 'postcss-loader', 'sass-loader',
            ],
          },
      ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CopyWebpackPlugin([
            {from:'src/img',to:'img'},
        ]),
        new HtmlWebpackPlugin(
          {
            template: './src/index.html'
        }
        ),
    ]
});