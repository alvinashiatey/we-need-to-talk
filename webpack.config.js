const path = require("path");
const htmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "index.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: "./dist/",
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  plugins: [
    new htmlWebPackPlugin({
      filename: "./index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new CopyPlugin([
      {
        from: "./src/manifest.json",
        to: "./manifest.json",
        toType: "file",
      },
      {
        from: "./src/assets/",
        to: "./assets/",
      },
    ]),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "src/sw.js"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
            },
          },
        ],
      },
      {
        type: "javascript/auto",
        test: /\.(json)/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" },
          },
        ],
      },
    ],
  },
  devtool: "cheap-module-source-map",
};
