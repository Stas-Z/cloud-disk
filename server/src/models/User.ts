import mongoose, { Schema, model } from 'mongoose'

export const { ObjectId } = mongoose.Types

// Свойства необходимые для создания нового Пользователя (параметры, которые мы хотим сохранить в базе данных)
interface UserAttrs {
    email: String
    password: string
    diskSpace: number
    usedSpace: number
    avatar: string
    files: typeof ObjectId
}
// Cвойства, которые имеет пользовательский документ (параметры, которые должен иметь пользовательский документ).
interface UserDoc extends mongoose.Document {
    email: string
    password: string
    diskSpace: number
    usedSpace: number
    avatar: string
    files: typeof ObjectId
}
// Интерфейс, описывающий свойства модели пользователя.
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: ObjectId, ref: 'File' }],
})

export default model<UserDoc, UserModel>('User', User)
