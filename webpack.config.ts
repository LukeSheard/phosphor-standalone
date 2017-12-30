import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { join } from "path";
import * as webpack from "webpack";

module.exports = function(env: string) {
  const PROD = env === "production";

  const plugins: webpack.Plugin[] = [
    new ExtractTextPlugin(`[name]${PROD ? ".min" : ""}.css`),
  ];

  if (PROD) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  const config: webpack.Configuration = {
    context: __dirname,
    devtool: PROD ? false : "source-map",
    entry: {
      phosphor: "./index.ts"
    },
    output: {
      filename: `[name]${PROD ? ".min" : ""}.js`,
      path: join(__dirname, "dist"),
      library: "phosphor",
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          loader: "ts-loader",
          options: {
            compilerOptions: {
              removeComments: PROD
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  minimize: PROD,
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins,
    resolve: {
      extensions: [
        ".js",
        ".css"
      ]
    }
  }
  return config;
}