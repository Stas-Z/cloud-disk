import mongoose, { Schema, Types, model } from 'mongoose'

export const { ObjectId } = mongoose.Types

// Свойства необходимые для создания нового Пользователя (параметры, которые мы хотим сохранить в базе данных)
export interface UserAttrs {
    email: String
    password: string
    username?: String
    diskSpace?: number
    usedSpace?: number
    avatar?: string
    files?: Types.ObjectId
}
// Свойства, которые имеет пользовательский документ (параметры, которые должен иметь пользовательский документ).
export interface UserDoc extends mongoose.Document {
    email: string
    password: string
    username?: string
    diskSpace?: number
    usedSpace?: number
    avatar?: string
    files?: Types.ObjectId
}
// Интерфейс, описывающий свойства модели пользователя.
export interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    diskSpace: { type: Number, default: 1024 ** 3 * 2 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: ObjectId, ref: 'File' }],
})

export default model<UserDoc, UserModel>('User', User)
