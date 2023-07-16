"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookConstant_1 = require("./bookConstant");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        require: true,
        enum: bookConstant_1.bookEnum,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    reviews: [
        {
            user: String,
            comment: String,
        },
    ],
    author: {
        type: String,
    },
    isFinished: {
        type: Boolean,
    },
    authorDetails: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const BookModel = (0, mongoose_1.model)('Book', bookSchema);
exports.default = BookModel;
