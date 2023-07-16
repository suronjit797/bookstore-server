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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./shared/logger");
let server;
process.on("uncaughtException", (error) => {
    console.log("uncaughtException: " + error.message);
    process.exit(1);
});
const bootFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.db_uri);
        (0, logger_1.successLog)("🛢 Database connection established...");
        server = app_1.default.listen(config_1.default.port, () => {
            (0, logger_1.successLog)("Server is listening on port: " + config_1.default.port);
            (0, logger_1.successLog)(config_1.default.db_uri);
        });
    }
    catch (error) {
        (0, logger_1.errorLog)(error);
    }
    process.on("unhandledRejection", (error) => {
        if (server) {
            server.close(() => {
                (0, logger_1.errorLog)("unhandledRejection");
                console.log(error);
                process.exit(1);
            });
        }
    });
});
bootFunction();
process.on("SIGALRM", () => {
    console.log("SIGTERM is received");
    if (server) {
        server.close();
    }
});
