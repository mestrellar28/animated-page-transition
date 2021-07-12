const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: 'production',
   // Entry point
   entry: {
      main: './src/index.js',
      vendor: './src/js/modules.js',
   },

   // Output path
   output: {
      filename: '[name][contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: '[hash][ext][query]',
      // assetModuleFilename: 'images/[hash][ext][query]',
   },

   // Plugins
   plugins: [
      // Clean output folder before compile
      new CleanWebpackPlugin(),

      // Extract CSS to output folder
      new MiniCssExtractPlugin({
         filename: '[name][contenthash].css',
         chunkFilename: '[id][contenthash].css',
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

      // Copy Images
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src', 'images'),
               to: 'images',
            },
         ],
      }),
   ],

   // Modules
   module: {
      rules: [
         // Styless rules
         {
            test: /\.(scss|css)$/,
            use: [
               MiniCssExtractPlugin.loader,
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
               minimize: {
                  removeComments: true,
                  collapseWhiteSpace: true,
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
