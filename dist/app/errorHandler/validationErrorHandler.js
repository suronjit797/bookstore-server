"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const validationErrorHandler = (error) => {
    const errorMessages = Object.values(error.errors).map((item) => ({
        path: item === null || item === void 0 ? void 0 : item.path,
        message: item === null || item === void 0 ? void 0 : item.message,
    }));
    return {
        success: false,
        statusCode: http_status_1.default.BAD_REQUEST,
        message: error.name,
        errorMessages,
    };
};
exports.default = validationErrorHandler;
