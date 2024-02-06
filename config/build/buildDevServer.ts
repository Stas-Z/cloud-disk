import { type Configuration as DevServerConfiguration } from 'webpack-dev-server'

// Чтобы не было пересечения с Configuration с webpack'а, переименовываем тип в DevServerConfiguration
import { type BuildOptions } from './types/config'

// Функция для настройки Dev Server'a
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  }
}
