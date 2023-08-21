import { model, Schema, Types } from 'mongoose'

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        accessKey: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Types.ObjectId,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

export const Note = model('notes', noteSchema)
