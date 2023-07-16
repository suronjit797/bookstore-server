"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookValidatorZod = exports.createBookValidatorZod = void 0;
const zod_1 = require("zod");
const bookConstant_1 = require("./bookConstant");
exports.createBookValidatorZod = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        genre: zod_1.z.enum(bookConstant_1.bookEnum),
        publicationDate: zod_1.z.string().datetime(),
    }),
});
exports.updateBookValidatorZod = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        genre: zod_1.z.enum(bookConstant_1.bookEnum).optional(),
        publicationDate: zod_1.z.string().datetime().optional(),
        isFinishd: zod_1.z.boolean().optional(),
    }),
});
