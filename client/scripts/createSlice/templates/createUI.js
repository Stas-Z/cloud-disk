const fs = require('fs/promises')

const componentTemplate = require('./componentTemplate')
const storyTemplate = require('./storyTemplate')
const styleTemplate = require('./styleTemplate')
const firstCharDownCase = require('../firstCharDownCase')
const firstCharUpperCase = require('../firstCharUpperCase')
const resolveRoot = require('../resolveRoot')

module.exports = async (layer, sliceName) => {
    const resolveUIPath = (...segments) =>
        resolveRoot('src', layer, sliceName, 'ui', ...segments)

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolveUIPath())
        } catch (e) {
            console.log('Не удалось создать UI директорию')
        }
    }

    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName)
            const componentDownName = firstCharDownCase(sliceName)
            await fs.mkdir(resolveUIPath(componentName))
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName, componentDownName),
            )
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.stories.tsx`),
                storyTemplate(layer, componentName),
            )
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(componentDownName),
            )
        } catch (e) {
            console.log('Не удалось создать компонент')
        }
    }

    await createUIDir()
    await createComponent()
}
