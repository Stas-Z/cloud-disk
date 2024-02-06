import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

import type {  BuildOptions } from './types/config'

// Функция которая возвращает список плагинов
export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  // Специальный тип для плагинов

  const isProd = !isDev

  const plugins = [
    new HtmlWebpackPlugin({
      // Создаёт для сборки фаил index.html и подключает в него все скрпты и другие файлы
      template: paths.html, // Путь к шаблоны index.html
    }),
    new webpack.ProgressPlugin(),

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
  ]

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    )
    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: paths.locales, to: paths.buildLocales },
          { from: paths.img, to: paths.buildImg },
        ],
      })
    )
  }

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin()) // наш hmr плагин
    plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
      })
    )
    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
        },
      })
    )
  }

  return plugins
}
