module.exports = (
  layer,
  componentName,
) => `import { StoryObj, Meta } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { ${componentName} } from './${componentName}'

export default {
  title: '${layer}/${componentName}',
  component: ${componentName},
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ${componentName}>

type Template = StoryObj<typeof ${componentName}>

export const Light: Template = {
  args: {},
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const Dark: Template = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Choco: Template = {
  args: {},
  decorators: [ThemeDecorator(Theme.CHOCOLATE)]
}
`
