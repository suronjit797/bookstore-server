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
const users_service_1 = __importDefault(require("./users.service"));
const config_1 = __importDefault(require("../../../config"));
const signUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield users_service_1.default.signUpService(req.body);
        const payload = {
            statusCode: data.statusCode,
            success: data.success,
            message: data.message,
            data: data.data,
        };
        // send response
        return res.status(payload.statusCode).send(payload);
    }
    catch (error) {
        return next(error);
    }
});
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield users_service_1.default.loginService(req.body);
        const { accessToken, refreshToken } = data.data;
        const cookieOptions = {
            secure: config_1.default.node_env === 'production',
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        const payload = {
            statusCode: data.statusCode,
            success: data.success,
            message: data.message,
            data: { accessToken },
        };
        // send response
        return res.status(payload.statusCode).send(payload);
    }
    catch (error) {
        return next(error);
    }
});
const getMyDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const payload = {
            statusCode: 200,
            success: true,
            message: 'User data get successful',
            data: user,
        };
        // send response
        return res.status(payload.statusCode).send(payload);
    }
    catch (error) {
        return next(error);
    }
});
const usersController = {
    signUpController,
    loginController,
    getMyDataController
};
exports.default = usersController;
