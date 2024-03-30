import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './ScrollSave.module.scss'



interface ScrollSaveProps {
  className?: string
}

export const ScrollSave = memo((props: ScrollSaveProps) => {
  const { className } = props
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.scrollSave, {}, [className])}>
      <div />
    </div>
  )
})
