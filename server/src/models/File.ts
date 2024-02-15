import mongoose, { Schema, model } from 'mongoose'

export const { ObjectId } = mongoose.Types
// Свойства необходимые для создания нового Файла (параметры, которые мы хотим сохранить в базе данных)
export interface FileAttrs {
    _id: typeof ObjectId
    name: string
    type: string
    accessLink?: string
    size?: number
    path?: string
    date?: Date
    user?: typeof ObjectId
    parent?: typeof ObjectId
    childs?: [typeof ObjectId]
}
// Свойства, которые имеет файловый документ (параметры, которые должен иметь файловый документ).
export interface FileDoc extends mongoose.Document {
    _id: typeof ObjectId
    name: string
    type: string
    accessLink?: string
    size?: number
    path?: string
    date?: Date
    user?: typeof ObjectId
    parent?: typeof ObjectId
    childs?: [typeof ObjectId]
}
// Интерфейс, описывающий свойства модели файла.
export interface FileModel extends mongoose.Model<FileDoc> {
    build(attrs: FileAttrs): FileDoc
}

const File = new Schema({
    _id: { type: ObjectId },
    name: { type: String, required: true }, // Имя файла
    type: { type: String, required: true }, // Тип файла: jpeg png zip
    accessLink: { type: String }, // Ссылка доступа
    size: { type: Number, default: 0 }, // Размер файла byte
    path: { type: String, default: '' }, // Путь к файлу
    date: { type: Date, default: Date.now() }, // Дата создание файла
    user: { type: ObjectId, ref: 'User' }, // Ссылается на пользователя который добавил файл
    parent: { type: ObjectId, ref: 'File' }, // Ссылается на папку в которой находится файл
    childs: [{ type: ObjectId, ref: 'File' }], // Ссылается на все файлы которые будут лежать внутри папки
})

export default model<FileDoc, FileModel>('File', File)
