module.exports = {
    // change to .tsx if necessary
    entry: './src/DashBoard.jsx',
    output: {
      filename: 'bundle.js'
    },
    watch: true,
    resolve: {
      // changed from extensions: [".js", ".jsx"]
      extensions: [".css", ".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
        { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
        // { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' } },
        { test: /\.css$/, loader:[ 'style-loader', 'css-loader' ] },
        // addition - add source-map support 
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    // externals: {
    //   "react": "React",
    //   "react-dom": "ReactDOM",
    // },
    // addition - add source-map support
    //devtool: "source-map"
  }