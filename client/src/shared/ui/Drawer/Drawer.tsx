import {
    ReactNode,
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import {
    AnimationProvider,
    useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider'

import cls from './Drawer.module.scss'
import { Overlay } from '../Overlay'
import { Portal } from '../Portal'

interface DrawerProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Содержимое модульного окна.
     */
    children: ReactNode
    /**
     * @description Флаг для отображения/скрытия модального окна.
     */
    isOpen?: boolean
    /**
     * @description Callback для закрытия модального окна.
     */
    onClose?: () => void
    /**
     * @description Флаг, для отрисовки модального окна, только тогда, когда оно открыто.
     */
    lazy?: boolean
    /**
     * @description Высота Drawer в процентах 0.7 = 70%
     */
    height?: number
}

const DrawerContext = createContext<() => void>(() => {})

export const useDrawer = () => useContext(DrawerContext)

export const DrawerContent = memo((props: DrawerProps) => {
    const { className, children, isOpen, onClose, lazy, height = 0.7 } = props

    const drawerHeight = window.innerHeight * height

    const { Gesture, Spring } = useAnimationLibs()

    const [{ y }, api] = Spring.useSpring(() => ({ y: drawerHeight }))

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false })
    }, [api])

    useEffect(() => {
        if (isOpen) {
            openDrawer()
        }
    }, [isOpen, openDrawer, api])

    const close = useCallback(
        (velocity = 0) => {
            api.start({
                y: drawerHeight,
                immediate: false,
                config: { ...Spring.config.stiff, velocity },
                onResolve: onClose,
            })
        },
        [Spring.config.stiff, api, drawerHeight, onClose],
    )

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel()

            if (last) {
                if (my > drawerHeight * 0.5 || (vy > 0.5 && dy > 0)) {
                    close()
                } else {
                    openDrawer()
                }
            } else {
                api.start({ y: my, immediate: true })
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    )

    const mods: Mods = {
        [cls.opened]: isOpen,
    }

    if (lazy && !isOpen) {
        return null
    }

    const display = y.to((py) => (py < drawerHeight ? 'block' : 'none'))

    return (
        <DrawerContext.Provider value={close}>
            <Portal element={document.getElementById('app') ?? document.body}>
                <div
                    className={classNames(cls.drawer, mods, [
                        className,
                        cls.drawer,
                    ])}
                >
                    <Overlay onClick={() => close()} />
                    <Spring.a.div
                        className={cls.sheet}
                        style={{
                            display,
                            bottom: `calc(-100vh + ${drawerHeight - 100}px)`,
                            y,
                        }}
                        {...bind()}
                    >
                        {children}
                    </Spring.a.div>
                </div>
            </Portal>
        </DrawerContext.Provider>
    )
})

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs()

    if (!isLoaded) {
        return null
    }

    return <DrawerContent {...props} />
}

export const Drawer = memo((props: DrawerProps) => {
    return (
        <AnimationProvider>
            <DrawerAsync {...props} />
        </AnimationProvider>
    )
})
