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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = require("../apiError");
const config_1 = require("../config");
const constants_1 = require("../constants");
class AuthMiddleware {
    static isAuthorized(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token) {
                return next(new apiError_1.ApiError("Token is required", 401));
            }
            try {
                const { _id } = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
                if (!_id) {
                    return next(new apiError_1.ApiError("Invalid token", 401));
                }
                res.locals.userId = _id;
                next();
            }
            catch (e) {
                return next(new apiError_1.ApiError(e.message, 400));
            }
        });
    }
    static isDataValid(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(new apiError_1.ApiError("Invalid data", 400));
        }
        const isPasswordValid = constants_1.passwordRegexp.test(password);
        if (!isPasswordValid) {
            return next(new apiError_1.ApiError(`Password does not match pattern ${constants_1.passwordRegexp}`, 400));
        }
        next();
    }
}
exports.AuthMiddleware = AuthMiddleware;
