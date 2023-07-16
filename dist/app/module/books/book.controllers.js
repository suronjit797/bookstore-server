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
const paginationHelper_1 = require("../../../helper/paginationHelper");
const filterHelper_1 = __importDefault(require("../../../helper/filterHelper"));
const book_service_1 = __importDefault(require("./book.service"));
const users_Model_1 = __importDefault(require("../users/users.Model"));
const ApiError_1 = __importDefault(require("../../../shared/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const book_Model_1 = __importDefault(require("./book.Model"));
const createBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserExist = users_Model_1.default.isExist(req.user.email);
        if (!isUserExist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
        }
        const newBook = Object.assign(Object.assign({}, req.body), { author: req.user.name, authorDetails: req.user._id });
        const data = yield book_service_1.default.createBookService(newBook);
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
const getAllBooksController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagination = (0, paginationHelper_1.paginationHelper)(req.query);
        const filter = (0, filterHelper_1.default)(req, new book_Model_1.default(), ['title', 'genre', 'author'], ['publicationDate']);
        const data = yield book_service_1.default.getAllBooksService(filter, pagination);
        const payload = {
            statusCode: data.statusCode,
            success: data.success,
            message: data.message,
            meta: data.meta,
            data: data.data,
        };
        // send response
        return res.status(payload.statusCode).send(payload);
    }
    catch (error) {
        return next(error);
    }
});
const getSingleBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const data = yield book_service_1.default.getBookService(bookId);
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
const updateBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const data = yield book_service_1.default.updateBookService(bookId, req.body);
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
const removeBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const data = yield book_service_1.default.removeBookService(bookId);
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
const getAllYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagination = (0, paginationHelper_1.paginationHelper)(req.query);
        const data = yield book_service_1.default.getYearService(pagination);
        const payload = {
            statusCode: data.statusCode,
            success: data.success,
            message: data.message,
            meta: data.meta,
            data: data.data,
        };
        // send response
        return res.status(payload.statusCode).send(payload);
    }
    catch (error) {
        return next(error);
    }
});
const bookController = {
    createBookController,
    getAllBooksController,
    getSingleBookController,
    updateBookController,
    removeBookController,
    getAllYear,
};
exports.default = bookController;
