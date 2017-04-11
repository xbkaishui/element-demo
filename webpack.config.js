const {
  resolve
} = require('path')
const webpack = require('webpack')
var isProd = (process.env.NODE_ENV === 'production');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  var plugins = [];
  debugger;
  console.log(process.env);
  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  }));
  plugins.push(new HtmlWebpackPlugin({
      template: 'src/index.html'
    }));
  // Conditionally add plugins for Production builds.
  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }
  // Conditionally add plugins for Development
  else {
    // ...
  }
  return plugins;
}

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [
          resolve(__dirname, 'src')
          // resolve(__dirname, 'node_modules/')
        ]},
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /favicon\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: getPlugins(),
  // plugins: [
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   names: ['manifest']
  //   // }),
  //   new HtmlWebpackPlugin({
  //     template: 'src/index.html'
  //   }),
  //     // new UglifyJSPlugin()
  // ],
  resolve: {
    alias: {
        vue: 'vue/dist/vue.js',
        '~': resolve(__dirname, 'src')
    }
  },
  // target: 'node',
  node : {
    fs: "empty",
    console: true
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      // '/api/': {
      //   target: 'http://127.0.0.1:8011',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  // devtool: options.dev ? '#eval-source-map' : '#source-map'
})
