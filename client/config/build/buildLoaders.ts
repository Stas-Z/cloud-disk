import type webpack from 'webpack'

import { buildBabelLoader } from './loaders/buildBabelLoader'
import { buildCssLoader } from './loaders/buildCssLoader'
import { type BuildOptions } from './types/config'

// Функция которая возвращает список лоадеров
export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options
    // конфигурируем загрузчики (loaders) для файлов (*.png, *.jpg, *.svg, *.css, *.ts и т.д.)

    // Если не используем тайпскрипт - нужен babel-loader

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    }

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
    const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true })

    const cssLoader = buildCssLoader(isDev)

    return [fileLoader, svgLoader, codeBabelLoader, tsxBabelLoader, cssLoader]
}
