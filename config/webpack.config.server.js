const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const util = require("./util");

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: "./src/entry-server.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "entry-server.js",
    libraryTarget: "commonjs2"  // 打包成commonjs2规范
  },
  target: "node",  // 指定node运行环境
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                "@babel/preset-react",
                [
                  "@babel/preset-env",
                  {
                    "targets": {
                      "node": "current"
                    }
                  }
                ]
              ],
              "plugins": [
                "dynamic-import-node",
                "@loadable/babel-plugin"
              ]
            }
          },
          {
            loader: "eslint-loader"
          }
        ],
        exclude: /node_modules/
      },
      ...util.styleLoaders({
        sourceMap: true,
        usePostCSS: true,
        extract: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_ENV": JSON.stringify("server")  // 指定React环境为服务端
    }),
    // 服务端不支持window document等对象，需将css外链
    new ExtractTextPlugin({
      filename: "static/css/[name].[contenthash].css"
    })
  ]
});

module.exports = webpackConfig;
