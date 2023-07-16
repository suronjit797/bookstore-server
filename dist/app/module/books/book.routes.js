"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalValidation_1 = __importDefault(require("../../middleware/globalValidation"));
const book_controllers_1 = __importDefault(require("./book.controllers"));
const book_validator_1 = require("./book.validator");
const auth_1 = require("../../middleware/auth");
const bookRoute = express_1.default.Router();
bookRoute.post('/', (0, globalValidation_1.default)(book_validator_1.createBookValidatorZod), auth_1.tokenVerify, book_controllers_1.default.createBookController);
bookRoute.get('/', book_controllers_1.default.getAllBooksController);
bookRoute.get('/year', book_controllers_1.default.getAllYear);
// params
bookRoute.get('/:bookId', book_controllers_1.default.getSingleBookController);
bookRoute.patch('/:bookId', auth_1.tokenVerify, (0, globalValidation_1.default)(book_validator_1.updateBookValidatorZod), book_controllers_1.default.updateBookController);
bookRoute.delete('/:bookId', auth_1.tokenVerify, book_controllers_1.default.removeBookController);
exports.default = bookRoute;
