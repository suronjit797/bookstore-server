"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT || 5000,
    db_uri: process.env.DB_URI,
    node_env: process.env.NODE_ENV || 'development',
    sault_round: Number(process.env.SAULT_ROUND) || 12,
    token: {
        refresh_token_time: process.env.REFRESH_TOKEN_TIME,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        access_token_time: process.env.ACCESS_TOKEN_TIME,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    },
};
