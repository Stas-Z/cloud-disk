import { CSSProperties, memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Skeleton.module.scss'

interface SkeletonProps {
  /**
   * @description additional class.
   */
  className?: string
  /**
   * @description Skeleton height.
   */
  height?: string | number
  /**
   * @description Skeleton width.
   */
  width?: string | number
  /**
   * @description Border radius of skeleton
   */
  border?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, border, height, width } = props

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  }

  return (
    <div className={classNames(cls.skeleton, {}, [className])} style={styles}>
      <div />
    </div>
  )
})
