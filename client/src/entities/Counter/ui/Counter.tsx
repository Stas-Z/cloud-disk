import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import { getCounter } from '../model/selectors/getCounter/getCounter'
import { counterActions } from '../model/slice/counterSlice'

export const Counter = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const counterValue = useSelector(getCounter)

    const handleInc = () => {
        dispatch(counterActions.increment())
    }

    const handleDec = () => {
        dispatch(counterActions.decrement())
    }
    const handleAddFive = () => {
        dispatch(counterActions.incrementByAmount(5))
    }
    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <button type="button" onClick={handleInc}>
                {t('increment')}
            </button>
            <button type="button" onClick={handleDec}>
                {t('decrement')}
            </button>
            <button type="button" onClick={handleAddFive}>
                {t('add 5')}
            </button>
        </div>
    )
}
