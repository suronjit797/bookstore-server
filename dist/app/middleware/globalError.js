"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const validationErrorHandler_1 = __importDefault(require("../errorHandler/validationErrorHandler"));
// import { errorLog } from '../../shared/logger'
const zodErrorHandler_1 = __importDefault(require("../errorHandler/zodErrorHandler"));
// import { ZodError } from 'zod'
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalError = (error, req, res, next) => {
    let status = error.statusCode || 500;
    let message = error.message || 'Internal server error occurred';
    let errorMessages = [
        {
            path: '',
            message: error.message || 'Server error occurred',
        },
    ];
    // console.log(error)
    switch (error === null || error === void 0 ? void 0 : error.name) {
        case 'ValidationError': {
            const result = (0, validationErrorHandler_1.default)(error);
            status = result.statusCode || 500;
            message = result.message;
            errorMessages = result.errorMessages;
            break;
        }
        case 'ZodError': {
            const result = (0, zodErrorHandler_1.default)(error);
            status = result.statusCode || 500;
            message = result.message;
            errorMessages = result.errorMessages;
            break;
        }
        default:
            break;
    }
    const errorPayload = {
        success: false,
        message,
        errorMessages,
        stack: config_1.default.node_env !== 'production' && (error === null || error === void 0 ? void 0 : error.stack),
    };
    console.log(` [${status}]: ${message}`);
    return res.status(status).send(errorPayload);
};
exports.default = globalError;
