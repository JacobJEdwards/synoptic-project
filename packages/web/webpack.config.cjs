const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const exclude = /node_modules/;
const include = path.resolve(__dirname, "src");

const babelPresets = [["@babel/preset-env", { targets: { node: "current" } }]];

const babelPlugins = [
  "@babel/plugin-proposal-class-properties",
  ["@babel/plugin-transform-runtime", { regenerator: true }],
];

module.exports = {
  mode: "development",
  entry: {
    app: "/src/root.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    preferRelative: true,
    alias: {
      "/views": path.resolve(__dirname, "src/views"),
      "/root.js": path.resolve(__dirname, "src/root.js"),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude,
        include,
        use: {
          loader: "babel-loader",
          options: {
            presets: babelPresets,
            plugins: babelPlugins,
          },
        },
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
