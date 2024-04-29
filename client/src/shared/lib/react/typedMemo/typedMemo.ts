import { memo } from 'react'

/**
 * @description typedMemo — это оболочка React.memo, которая позволяет передавать
 * в компонент generic типы.
 */
export const typedMemo: <T>(Component: T) => T = memo
