"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = exports.pic = void 0;
const pic = (obj, keys) => {
    const findObject = {};
    for (const key of keys) {
        if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
            findObject[key] = obj[key];
        }
    }
    return findObject;
};
exports.pic = pic;
const paginationHelper = (obj) => {
    const keys = ['page', 'limit', 'sortOrder', 'sortBy'];
    const options = (0, exports.pic)(obj, keys);
    const page = Math.abs(Number(options.page) || 1);
    const limit = Math.abs(Number(options.limit) || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    let sortOrder = options.sortOrder || 'desc';
    const validSortOrderValues = [1, -1, 'asc', 'ascending', 'desc', 'descending'];
    if (!validSortOrderValues.includes(sortOrder)) {
        sortOrder = 'desc';
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    return {
        page,
        limit,
        skip,
        sortCondition,
    };
};
exports.paginationHelper = paginationHelper;
