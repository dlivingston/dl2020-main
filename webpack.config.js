const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    // mode: 'development',
    entry: {
        main: ['./src/index.js', './src/styles/main.scss']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["dist"] }),
        new HtmlWebpackPlugin({
            title: 'DL React Build',
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
          filename: "css/[name].css",
          chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../'
                  }
                },
                { loader: "css-loader" },
                {
                  loader: "sass-loader",
                  options: {
                    sourceMap: true,
                    sassOptions: {
                        incudePaths: ["src/styles"]
                    }
                  }
                }
              ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
}