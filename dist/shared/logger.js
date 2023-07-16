"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLog = exports.successLog = void 0;
require("colors");
const successLog = (message) => console.log(message.green.bold);
exports.successLog = successLog;
const errorLog = (message) => console.log(message.red.bold);
exports.errorLog = errorLog;
