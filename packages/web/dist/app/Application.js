"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
class App {
    constructor({ port, middleware }) {
        this.app = (0, express_1.default)();
        this.port = this.normalizePort(port);
        this.app.set("port", this.port);
        this.app.use(express_1.default.static("views"));
        this.applyMiddleware(middleware);
        this.addErrorRoute();
    }
    get(path, callback) {
        this.app.get(path, callback);
    }
    post(path, callback) {
        this.app.post(path, callback);
    }
    all(path, callback) {
        this.app.all(path, callback);
    }
    use(path, callback) {
        if (!callback) {
            this.app.use(path);
        }
        else {
            this.app.use(path, callback);
        }
    }
    addErrorRoute() {
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.send(err.message);
        });
    }
    applyMiddleware(middleware) {
        middleware.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    listen() {
        const server = (0, http_1.createServer)(this.app);
        server.listen(this.port);
        server.on("error", this.onError);
        server.on("listening", () => this.onListening(server));
    }
    onListening(server) {
        const addr = server.address();
        if (!addr)
            return;
        const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }
    onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }
        const bind = typeof this.port === "string" ? `Pipe ${this.port}` : `Port ${this.port}`;
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    normalizePort(val) {
        if (typeof val === "number") {
            return val;
        }
        const port = parseInt(val, 10);
        if (!isNaN(port)) {
            return val;
        }
        throw new Error(`Invalid port: ${val}`);
    }
}
exports.default = App;
