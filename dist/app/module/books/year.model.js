"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const yearSchema = new mongoose_1.Schema({
    year: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const YearModel = (0, mongoose_1.model)('Year', yearSchema);
exports.default = YearModel;
