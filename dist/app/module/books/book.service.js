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
const http_status_1 = __importDefault(require("http-status"));
const book_Model_1 = __importDefault(require("./book.Model"));
const year_model_1 = __importDefault(require("./year.model"));
const createBookService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const year = new Date(payload.publicationDate).getFullYear().toString();
    const isYearExist = yield year_model_1.default.find({ year: year.toString() });
    console.log(isYearExist, isYearExist.length, year);
    if (isYearExist.length === 0) {
        yield year_model_1.default.create({ year });
    }
    const data = yield book_Model_1.default.create(payload);
    return {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Book created successfully',
        data,
    };
});
const getAllBooksService = (filter, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortCondition } = pagination;
    const data = yield book_Model_1.default.find(filter)
        .limit(limit)
        .skip(skip)
        .sort(sortCondition)
        .populate('authorDetails', { email: 1, name: 1 });
    const total = yield book_Model_1.default.countDocuments(filter);
    return {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully',
        data,
        meta: {
            page,
            limit,
            total,
        },
    };
});
const getBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_Model_1.default.findById(id).populate({ path: 'authorDetails', select: { name: 1, email: 1 } });
    return {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully',
        data,
    };
});
const updateBookService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_Model_1.default.findByIdAndUpdate(id, body, { new: true });
    return {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data,
    };
});
const removeBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_Model_1.default.findByIdAndDelete(id);
    return {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted successfully',
        data,
    };
});
const getYearService = (pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortCondition } = pagination;
    const years = [];
    const data = yield year_model_1.default.find().limit(limit).skip(skip).sort(sortCondition).select({ year: 1, _id: 0 });
    const total = yield year_model_1.default.countDocuments();
    data.map((y) => years.push(y.year));
    const sorted = years.sort();
    return {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Year retrieved successfully',
        data: sorted,
        meta: {
            page,
            limit,
            total,
        },
    };
});
const bookService = {
    createBookService,
    getAllBooksService,
    getBookService,
    updateBookService,
    removeBookService,
    getYearService,
};
exports.default = bookService;
