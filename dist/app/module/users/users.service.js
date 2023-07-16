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
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../shared/ApiError"));
const users_Model_1 = __importDefault(require("./users.Model"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUpService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isExist = yield users_Model_1.default.findOne({ email: payload.email });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'User already exists');
    }
    const data = yield users_Model_1.default.create(payload);
    data.password = undefined;
    return {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'User created successfully',
        data,
    };
});
const loginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // existence of user
    const isExist = yield users_Model_1.default.isExist(payload.email);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const { _id, password, email, name } = isExist;
    // if no password
    if (!password)
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Server error occurred');
    if (!payload.password)
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Password is required');
    // verify
    const isVerified = yield users_Model_1.default.isPasswordMatched(payload.password, password);
    if (!isVerified)
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Password dose not matched');
    const accessToken = jsonwebtoken_1.default.sign({ _id, email, name }, config_1.default.token.access_token_secret, {
        expiresIn: config_1.default.token.access_token_time,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ _id, email, name }, config_1.default.token.refresh_token_secret, {
        expiresIn: config_1.default.token.refresh_token_time,
    });
    return {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: { accessToken, refreshToken },
    };
});
const usersService = {
    signUpService,
    loginService,
};
exports.default = usersService;
