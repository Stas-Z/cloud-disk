import {
    ImgHTMLAttributes,
    ReactElement,
    memo,
    useLayoutEffect,
    useState,
} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description заглушка, показывается пока не загрузиться изображение.
     */
    fallback?: ReactElement
    /**
     * @description заглушка, показывается если изображение нету.
     */
    errorFallback?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        errorFallback,
        fallback,
        ...otherProps
    } = props

    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
        const img = new Image()
        img.src = src ?? ''
        img.onload = () => {
            setIsLoading(false)
            setHasError(false)
        }
        img.onerror = () => {
            setIsLoading(false)
            setHasError(true)
        }
    }, [src])

    if (isLoading && fallback) {
        return fallback
    }

    if (hasError && errorFallback) {
        return (
            <div {...otherProps} className={className}>
                {errorFallback}
            </div>
        )
    }

    return <img className={className} src={src} alt={alt} {...otherProps} />
})
