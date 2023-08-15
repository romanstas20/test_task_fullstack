"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteServices = void 0;
const models_1 = require("../models");
const apiError_1 = require("../apiError");
class NoteServices {
    static createNote(note, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessKey = NoteServices.encryptAccessKey(userId, note.accessKey);
                return yield models_1.Note.create(Object.assign(Object.assign({}, note), { accessKey }));
            }
            catch (e) {
                throw new apiError_1.ApiError(e.message, e.status);
            }
        });
    }
    static getByAccessKey(userId, accessKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedKey = NoteServices.encryptAccessKey(userId, accessKey);
            const note = yield models_1.Note.findOne({ accessKey: encryptedKey });
            if (!note) {
                throw new apiError_1.ApiError('Note does not exist', 404);
            }
            return note;
        });
    }
    static encryptAccessKey(userId, accessKey) {
        try {
            return userId + '_' + Buffer.from(accessKey).toString("base64");
        }
        catch (e) {
            throw new apiError_1.ApiError(e.message, e.status);
        }
    }
}
exports.NoteServices = NoteServices;
