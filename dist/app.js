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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/module/routes"));
const globalError_1 = __importDefault(require("./app/middleware/globalError"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
// router
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_1.default.OK).send('Welcome to Book shop');
}));
app.use(globalError_1.default);
// handle not found route
app.use((req, res) => {
    const errorPayload = {
        success: false,
        message: 'Route not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Route not found',
            },
        ],
    };
    return res.status(404).send(errorPayload);
});
exports.default = app;
