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
exports.NoteMiddleware = void 0;
const services_1 = require("../services");
const apiError_1 = require("../apiError");
const models_1 = require("../models");
class NoteMiddleware {
    static isKeyValid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { key: accessKey } = req.params;
                const { userId } = res.locals;
                res.locals.note = yield services_1.NoteServices.getByAccessKey(userId, accessKey);
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
    static isNoteExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, accessKey } = req.body;
                const { userId } = res.locals;
                const encryptedKey = services_1.NoteServices.encryptAccessKey(userId, accessKey);
                const note = yield models_1.Note.findOne({
                    $or: [
                        { accessKey: encryptedKey },
                        { title }
                    ]
                });
                if (note) {
                    return next(new apiError_1.ApiError("Note already exists", 400));
                }
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.NoteMiddleware = NoteMiddleware;
