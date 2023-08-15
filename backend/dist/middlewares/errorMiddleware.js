"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message });
};
exports.errorMiddleware = errorMiddleware;
