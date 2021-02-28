var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('css/[name].css');
// console.log("resolve:",path.resolve(__dirname, "./src"));

// if(process.env.NODE_ENV === "development"){
//   console.log(process.env.NODE_ENV);
// }

module.exports = {
  // mode:process.env.NODE_ENV,
  context: path.resolve(__dirname, "./src"),
  entry: {
    index: './js/index.js',
    about: './js/about.js'
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: './js/[name].js',
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets:true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: "file-loader",
          options: {
            loader: "file-loader",
            options: {
              name: '[path][name].[ext]'
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader','postcss-loader'])
      },
      {
        test: /\.(sass|scss)$/,
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ])
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    extractCSS
  ]
}
