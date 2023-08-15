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
exports.NoteController = void 0;
const services_1 = require("../services");
class NoteController {
    static createNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals.userId;
                const { title, body } = yield services_1.NoteServices.createNote(req.body, userId);
                return res.json({ title, body });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getByAccessKey(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { key: accessKey } = req.params;
                const { title, body } = res.locals.note;
                return res.json({ title, body });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.NoteController = NoteController;
