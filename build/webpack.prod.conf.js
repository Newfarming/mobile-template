'use strict'

const fs = require('fs')
const path = require('path')
const url = require('url')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const loadMinified = require('./load-minified')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')
const BundleAnalyzerPlugin = new require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const _ = require('lodash')

const IS_PRE = process.env.NODE_PRE === 'pre';
const NODE_ENV = process.env.NODE_ENV;
const env = NODE_ENV === 'testing' ?
  require('../config/test.env') :
  config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        commons: {
          test: /[\/]node_modules[\/]/,
          name: "vendor",
          chunks: "all"
        },
      }
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            unsafe_comps: false,
            unsafe: false,
            warnings: false,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          }
        }
      }),
    ]
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/' + config.build.version + '.[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/' + config.build.version + '.[id].[chunkhash].js'),
    publicPath: config.build.cdn
  },
  plugins: _.compact([
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/' + config.build.version + '.[name].[contenthash].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ?
        'index.html' : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`,
      env: {
        dns: config.build.dns
      },
      staticPrefix: config.build.cdn
    }),

    new AppManifestWebpackPlugin({
      logo: path.resolve(__dirname, '../static/img/logo.png'),
      persistentCache: false,
      prefix: config.build.cdn,
      output: 'static/icons-' + config.build.iconVersion + '-[hash:8]/',
      config: {
        appName: 'Club Factory Lite',
        shortName: 'CF Lite',
        scope: config.build.host,
        start_url: url.resolve(config.build.host, "/?utm_source=homescreen"),
        display: "standalone",
        orientation: "portrait",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
        version: '1.0',
      }
    }),

    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }]),

    // service worker caching
    // new SWPrecacheWebpackPlugin({
    //   cacheId: 'mobile-pwa',
    //   filename: 'service-worker.js',
    //   staticFileGlobs: ['dist/**/*.{js,html,css}'],
    //   minify: true,
    //   stripPrefix: 'dist/'
    // }),
    new WorkboxPlugin.InjectManifest({
      swDest: 'service-worker.js',
      swSrc: path.resolve(__dirname, 'sw-prod.js'),
      include: [/\.(?:js|css)$/],
      // exclude: [/\.(?:png|jpg|jpeg|svg)$/, /\.map$/],
    }),

    // webpack bundle analysis
    process.env.ANALYSIS && new BundleAnalyzerPlugin(),
  ]),
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
