"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidatorZod = exports.userRegisterValidatorZod = void 0;
const zod_1 = require("zod");
exports.userRegisterValidatorZod = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    })
});
exports.userLoginValidatorZod = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
