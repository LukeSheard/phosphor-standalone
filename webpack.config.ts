import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { join } from "path";
import * as webpack from "webpack";

export default function(env: string) {
  const PROD = env === "production";

  const plugins: webpack.Plugin[] = [
    new ExtractTextPlugin(`packages/[name]/dist/[name]${PROD ? ".min" : ""}.css`),
  ];

  if (PROD) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  const config: webpack.Configuration = {
    context: __dirname,
    devtool: PROD ? false : "source-map",
    entry: [
      "@phosphor/widgets",
      "@phosphor/widgets/style",
    ],
    output: {
      filename: `phosphor${PROD ? ".min" : ""}.js`,
      path: join(__dirname, "dist"),
      library: "phosphor",
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: "ts-loader"
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
}