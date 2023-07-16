"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper_1 = require("./paginationHelper");
const moment_1 = __importDefault(require("moment"));
const filterHelper = (req, schemaName, partialSearching, dateSearching) => {
    const schemaKeys = Object.keys(schemaName.schema.obj);
    const filter = (0, paginationHelper_1.pic)(req.query, ['query', ...schemaKeys]);
    const { query } = filter, filterData = __rest(filter, ["query"]);
    const andCondition = [];
    if (query && partialSearching.length > 0) {
        andCondition.push({
            $or: partialSearching.map((field) => {
                return {
                    [field]: {
                        $regex: query,
                        $options: 'i',
                    },
                };
            }),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            $and: Object.entries(filterData).map(([key, value]) => {
                if (dateSearching.includes(key)) {
                    const startDate = (0, moment_1.default)(new Date(value.toString())).startOf('year').format();
                    const endDate = (0, moment_1.default)(new Date(value.toString())).endOf('year').format();
                    return {
                        [key]: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        },
                    };
                }
                return { [key]: value };
            }),
        });
    }
    return andCondition.length > 0 ? { $and: andCondition } : {};
};
exports.default = filterHelper;
