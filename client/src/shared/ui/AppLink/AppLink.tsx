import { ReactNode, Ref, forwardRef, memo } from 'react'

import { LinkProps, NavLink } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps {
  /**
   * @description additional class.
   */
  className?: string
  /**
   * @description AppLink variant. Responsible for AppLink's color.
   * @default 'primary'
   */
  variant?: AppLinkVariant
  /**
   * @description AppLink content
   */
  children?: ReactNode
  /**
   * ClassName for active link
   */
  activeClassName?: string
}

const AppLink = forwardRef(
  (props: AppLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const {
      to,
      className,
      children,
      variant = 'primary',
      activeClassName = '',
      ...otherProps
    } = props

    return (
      <NavLink
        ref={ref}
        to={to}
        className={({ isActive }) =>
          classNames(cls.appLink, { [activeClassName]: isActive }, [
            className,
            cls[variant],
          ])
        }
        {...otherProps}
      >
        {children}
      </NavLink>
    )
  },
)
export default memo(AppLink)
