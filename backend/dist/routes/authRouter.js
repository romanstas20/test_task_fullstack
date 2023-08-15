"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const middlewares_2 = require("../middlewares");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.post("/login", middlewares_2.CommonMiddleware.isRecordExists("username", models_1.User), controllers_1.AuthController.login);
router.post("/register", middlewares_1.AuthMiddleware.isDataValid, middlewares_2.CommonMiddleware.isRecordNotExists("username", models_1.User), controllers_1.AuthController.register);
exports.authRouter = router;
