"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zodErrorHandler = (error) => {
    var _a;
    const errorMessages = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return {
        success: false,
        message: 'Validation Error',
        errorMessages,
        statusCode: http_status_1.default.BAD_REQUEST,
    };
};
exports.default = zodErrorHandler;
