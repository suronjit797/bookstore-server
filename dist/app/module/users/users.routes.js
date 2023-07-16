"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_validator_1 = require("./users.validator");
const users_controllers_1 = __importDefault(require("./users.controllers"));
const globalValidation_1 = __importDefault(require("../../middleware/globalValidation"));
const auth_1 = require("../../middleware/auth");
const usersRoute = express_1.default.Router();
usersRoute.post('/signup', (0, globalValidation_1.default)(users_validator_1.userRegisterValidatorZod), users_controllers_1.default.signUpController);
usersRoute.post('/login', (0, globalValidation_1.default)(users_validator_1.userLoginValidatorZod), users_controllers_1.default.loginController);
usersRoute.get('/me', auth_1.tokenVerify, users_controllers_1.default.getMyDataController);
exports.default = usersRoute;
