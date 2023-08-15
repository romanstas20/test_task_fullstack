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
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = require("../apiError");
const config_1 = require("../config");
const models_1 = require("../models");
class AuthService {
    static login(credentials, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordMatch = yield (0, bcrypt_1.compare)(credentials.password, user.password);
            if (!isPasswordMatch) {
                throw new apiError_1.ApiError("Invalid credentials", 400);
            }
            return jsonwebtoken_1.default.sign({ _id: user._id }, config_1.config.JWT_SECRET, {
                expiresIn: "7d"
            });
        });
    }
    static register(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = credentials;
            const salt = yield (0, bcrypt_1.genSalt)(config_1.config.SALT_COUNT);
            const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
            const { _id, username: createdUserName } = yield models_1.User.create({ username, password: hashedPassword });
            return { _id, username: createdUserName };
        });
    }
}
exports.AuthService = AuthService;
