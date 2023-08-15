import {Schema, model} from "mongoose"

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    accessKey: {
        type: String,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Note = model("notes", noteSchema)