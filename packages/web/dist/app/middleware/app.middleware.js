"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const redis_1 = __importDefault(require("./redis"));
const middleware = [
    (0, morgan_1.default)("dev"),
    (0, compression_1.default)(),
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
    (0, express_session_1.default)({
        store: redis_1.default,
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 60 * 60 * 24,
        },
    }),
];
exports.default = middleware;
