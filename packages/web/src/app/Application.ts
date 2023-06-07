import express from "express";
import type { Server } from "http";
import type { Request, Response, NextFunction, Application, RequestHandler, ErrorRequestHandler } from "express";
import { createServer } from "http";

export type AppOptions = {
    port: unknown;
    middleware: Array<Middleware>;
};

export type Middleware = RequestHandler | ErrorRequestHandler;

export type ExpressCallback = (
    req: Request,
    res: Response,
    next: NextFunction,
    ...args: any
) => void;

/*
 * App class
 * This class is responsible for creating the express application and
 * setting up the routes and middleware
 */
export default class App {
    app: Application;
    port: unknown;

    constructor({ port, middleware }: AppOptions) {
        this.app = express();

        this.port = this.normalizePort(port);
        this.app.set("port", this.port);

        this.app.use(express.static("views"));

        this.applyMiddleware(middleware);
        this.addErrorRoute();
    }

    /**
     * Adds a get route to the application
     * @param {string} path - the path to add the route to
     * @param {function} callback - the callback function to call when the route is hit
     */
    get(path: string, callback: ExpressCallback) {
        this.app.get(path, callback);
    }

    /**
     * Adds a post route to the application
     * @param {string} path - the path to add the route to
     * @param {function} callback - the callback function to call when the route is hit
     */
    post(path: string, callback: ExpressCallback) {
        this.app.post(path, callback);
    }

    all(path: string, callback: ExpressCallback) {
        this.app.all(path, callback);
    }

    /**
     * add middleware to the application
     * @param {string} path - the path to add the middleware to
     * @param {function} callback - the callback function to call when the middleware is hit
     * @returns {void}
     */
    use(path: string, callback: ExpressCallback) {
        if (!callback) {
            this.app.use(path);
        } else {
            this.app.use(path, callback);
        }
    }

    /**
     * Adds an error route to the application
     */
    addErrorRoute() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(err.status || 500);
            res.send(err.message);
        });
    }

    /**
     * Adds the middleware to the application
     */
    applyMiddleware(middleware: Array<Middleware>) {
        middleware.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    /**
     * Starts the application
     */
    listen() {
        const server: Server = createServer(this.app);
        server.listen(this.port);

        // Event listeners
        server.on("error", this.onError);
        server.on("listening", () => this.onListening(server));
    }

    /**
     * Handles the listening event for the server
     * @param {Server} server - the server to listen on
     */
    onListening(server: Server) {
        const addr = server.address();
        if (!addr) return;

        const bind =
            typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }

    /**
     * Handles the error event for the server
     * @param {NodeJS.ErrnoException} error - the error to handle
     * @throws - an error if the error is not handled
     */
    onError(error: any) {
        if (error.syscall !== "listen") {
            throw error;
        }

        const bind =
            typeof this.port === "string" ? `Pipe ${this.port}` : `Port ${this.port}`;

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

    /**
     * Normalises the port number / pipe name
     * @param {?} val
     * @return {number|string} the port number / pipe name
     * @throws {Error} if the port number / pipe name is invalid
     */
    normalizePort(val: any) {
        if (typeof val === "number") {
            return val;
        }

        const port = parseInt(val, 10);

        if (!isNaN(port)) {
            // named pipe
            return val;
        }

        throw new Error(`Invalid port: ${val}`);
    }
}
