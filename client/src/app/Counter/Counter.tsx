import { memo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Counter.module.scss'

interface CounterProps {
    className?: string
}

export const Counter = memo((props: CounterProps) => {
    const { className } = props
    const { t } = useTranslation()
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    return (
        <div className={classNames(cls.counter, {}, [className])}>
            <h1>{count}</h1>
            <button type="button" onClick={increment}>
                {t('Click me')}
            </button>
        </div>
    )
})
