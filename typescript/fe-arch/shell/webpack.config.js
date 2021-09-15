const path = require('path')
const webpack = require('webpack')
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const pkg = require('./package.json')

module.exports = function config(_, options) {
  const isEnvProduction = options.mode === 'production'
  const isEnvDevelopment = options.mode === 'development'
  const isDevServer = isEnvDevelopment && process.argv.includes('serve')
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile')

  process.env.BABEL_ENV = options.mode
  process.env.BROWSERSLIST_ENV = options.mode

  const appConfig = {
    name: 'app',
    mode: isEnvProduction ? 'production' : 'development',
    target: isDevServer ? 'web' : 'browserslist',
    bail: isEnvProduction,

    entry: './src',

    output: {
      path: path.resolve('dist'),
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/[name].js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/[name].js',
      publicPath: '/',
      uniqueName: 'app'
      // publicPath: 'auto'
    },

    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/].yarn[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },

    performance: {
      maxAssetSize: 600 * 1024,
      maxEntrypointSize: 600 * 1024
    },

    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.ts', '.d.ts', '.tsx', '.json'],
      alias: {
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling'
        })
      }
    },

    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            },
            {
              test: /\.(js|mjs|ts|tsx)$/,
              include: path.resolve(__dirname),
              loader: 'babel-loader',
              options: {
                plugins: [
                  ['@babel/plugin-transform-runtime'],
                  isDevServer && 'react-refresh/babel'
                ].filter(Boolean),
                cacheDirectory: `../.cache/${pkg.name}.babel-loader`,
                cacheCompression: false,
                compact: isEnvProduction
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {
          candidate: 'candidate@http://localhost:3001/remoteEntry.js'
        },
        shared: {
          react: { requiredVersion: '17.0.2', eager: true },
          'react-dom': { singleton: true },
          '@emotion/react': { singleton: true, requiredVersion: '11.1.5' },
          '@emotion/css': { singleton: true },
          '@emotion/react': { singleton: true },
          'twin.macro': { singleton: true },
          typescript: { singleton: true },
          tailwindcss: { singleton: true },
          msw: { singleton: true },
          'shared/store': { singleton: true, version: 'workspace:*' },
          zustand: {
            version: '3.5.8',
            singleton: true
          }
        }
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, 'public/index.html'),
        ...(isEnvProduction && {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        })
      }),
      isEnvProduction &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      !isDevServer &&
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './public',
              filter: filename =>
                filename !== path.resolve(__dirname, 'public/index.html')
            }
          ]
        }),
      isDevServer && new webpack.HotModuleReplacementPlugin(),
      isDevServer && new ReactRefreshWebpackPlugin(),
      new WebpackManifestPlugin({
        fileName: 'assets.json',
        publicPath: '/'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ].filter(Boolean)
  }

  const devServer = {
    compress: true,
    static: './public',
    historyApiFallback: {
      disableDotRule: true
    },
    port: 3000,
    hot: true
  }

  return isDevServer ? { ...appConfig, devServer } : appConfig
}
