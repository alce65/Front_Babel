const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "style.css"
  //disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: extractSass.extract({
          use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [extractSass],
  mode: "development",
  // mode: 'production',
  devServer: {
    host: '127.0.0.1',
    port: 8085,
    inline: true,
    contentBase: path.join(__dirname, "dist")
  }
};
