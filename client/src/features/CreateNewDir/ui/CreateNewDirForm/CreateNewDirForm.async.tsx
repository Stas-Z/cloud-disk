import { FC, lazy } from 'react'

import { CreateNewDirFormProps } from './CreateNewDirForm'

export const CreateNewDirFormAsync = lazy<FC<CreateNewDirFormProps>>(
    () => import('./CreateNewDirForm'),
)
