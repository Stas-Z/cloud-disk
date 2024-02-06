const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const reduxSliceTemplate = require('./reduxSliceTemplate')
const schemaTypeTemplate = require('./schemaTypeTemplate')
const firstCharDownCase = require('../firstCharDownCase')

module.exports = async (layer, sliceName) => {
  const resolveModelPath = (...segments) => resolveRoot('src', layer, sliceName, 'model', ...segments)

  const createModelStructure = async () => {
    try {
      await fs.mkdir(resolveModelPath())
      await fs.mkdir(resolveModelPath('types'))
      await fs.mkdir(resolveModelPath('slices'))
      await fs.mkdir(resolveModelPath('selectors'))
      await fs.mkdir(resolveModelPath('services'))
    } catch (e) {
      console.log(`Не удалось создать model сегмент для слайса ${sliceName}`, e)
    }
  }

  const createReduxSlice = async () => {
    try {
      const componentName = firstCharDownCase(sliceName)
      await fs.writeFile(
        resolveModelPath('slices', `${componentName}Slice.ts`),
        reduxSliceTemplate(componentName),
      )
    } catch (e) {
      console.log('Не удалось создать редакс слайс', e)
    }
  }

  const createSchemaType = async () => {
    try {
      const componentName = firstCharDownCase(sliceName)
      await fs.writeFile(
        resolveModelPath('types', `${componentName}Schema.ts`),
        schemaTypeTemplate(componentName),
      )
    } catch (e) {
      console.log('Не удалось создать тип схемы стейта', e)
    }
  }

  await createModelStructure()
  await createReduxSlice()
  await createSchemaType()
}
