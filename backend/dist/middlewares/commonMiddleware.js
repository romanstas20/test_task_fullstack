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
exports.CommonMiddleware = void 0;
const apiError_1 = require("../apiError");
class CommonMiddleware {
    static isRecordExists(fieldName, model, from = "body") {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const field = req[from][fieldName];
            const record = yield model.findOne({ [fieldName]: field });
            if (!record) {
                return next(new apiError_1.ApiError(`Record with ${fieldName} ${field} does not exist`, 404));
            }
            res.locals.record = record;
            next();
        });
    }
    static isRecordNotExists(fieldName, model, from = "body") {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const field = req[from][fieldName];
            const record = yield model.findOne({ [fieldName]: field });
            if (record) {
                return next(new apiError_1.ApiError(`Record with ${fieldName} ${field} already exists`, 400));
            }
            next();
        });
    }
}
exports.CommonMiddleware = CommonMiddleware;
