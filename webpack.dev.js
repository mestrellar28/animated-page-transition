const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: 'development',
   // Entry point
   entry: {
      main: './src/index.js',
      vendor: './src/js/modules.js',
   },

   // Output path
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: '[ext][query]',
   },

   target: 'web',
   devtool: 'source-map',

   // Dev server
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 8080,
      useLocalIp: true,
      host: '0.0.0.0',
   },

   // Plugins
   plugins: [
      // Clean output folder before compile
      new CleanWebpackPlugin(),

      // Extract CSS to output folder
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css',
      }),

      // Extract HTML to output folder
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: path.resolve('./src/index.html'),
         inject: 'body',
      }),

      // Extract HTML to output folder
      new HtmlWebpackPlugin({
         filename: 'page.html',
         template: path.resolve('./src/page.html'),
         inject: 'body',
      }),
   ],

   // Modules
   module: {
      rules: [
         // Styless rules
         {
            test: /\.(scss|css)$/,
            use: [
               'style-loader',
               'css-loader',
               'postcss-loader',
               'sass-loader',
            ],
         },

         // Javascript rules
         {
            test: /\.js$/i,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
            },
         },

         // HTML Rules
         {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
               sources: {
                  list: [
                     {
                        tag: 'source',
                        attribute: 'data-srcset',
                        type: 'srcset',
                     },
                     {
                        tag: 'source',
                        attribute: 'srcset',
                        type: 'srcset',
                     },
                     {
                        tag: 'img',
                        attribute: 'data-src',
                        type: 'src',
                     },
                     {
                        tag: 'img',
                        attribute: 'data-srcset',
                        type: 'srcset',
                     },
                     {
                        tag: 'img',
                        attribute: 'src',
                        type: 'src',
                     },
                  ],
               },
            },
         },

         // Images rules
         {
            test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
            type: 'asset/resource',
            generator: {
               filename: 'images/[hash][ext]',
            },
         },
      ],
   },
};
