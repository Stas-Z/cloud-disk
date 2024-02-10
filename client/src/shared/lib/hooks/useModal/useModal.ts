import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface useModalProps {
  onClose?: () => void
  isOpen?: boolean
  animationDelay: number
}

/**
 * @description Reusable hook for modal components (modal/drawer)
 * @param onClose
 * @param isOpen
 * @param animationDelay
 */

export function useModal(props: useModalProps) {
  const { onClose, animationDelay, isOpen } = props
  const [isMounted, setIsMounted] = useState(false) // Для монтирования модалки в дом

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  useEffect(() => {
    // Монтирования модалки
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  const close = useCallback(() => {
    if (onClose) {
      onClose()
      timerRef.current = setTimeout(() => {
        setIsMounted(false)
      }, animationDelay)
    }
  }, [animationDelay, onClose])

  // Функция 'onKeyDown' которая отслеживает нажатие клавиши, в данном случае 'Escape'
  const onKeyDown = useCallback(
    // Функция 'useCallback' мемоизирует значение какой-то функции, запоминает его и
    // всегда возвращает ссылку на одну и ту же функцию, если в массиве зависимости ничего не изменилось
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    },
    [close],
  )

  useEffect(() => {
    if (isOpen) {
      // На корень (window) навешиваем слушатель события keydown, который отрабатывает нажатие на кнопку
      window.addEventListener('keydown', onKeyDown)

      // Очищаем timer
      clearTimeout(timerRef.current)
    }
    return () => {
      // Очищаем слушатель событий keydown
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  return {
    isMounted,
    close,
  }
}
