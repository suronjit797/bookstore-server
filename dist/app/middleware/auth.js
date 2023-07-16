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
exports.tokenVerify = void 0;
const ApiError_1 = __importDefault(require("../../shared/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const users_Model_1 = __importDefault(require("../module/users/users.Model"));
const tokenVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token)
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'you are not authorized');
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.token.access_token_secret);
        let isExist = yield users_Model_1.default.findById(decoded._id);
        if (!isExist)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Invalid user`);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.tokenVerify = tokenVerify;
