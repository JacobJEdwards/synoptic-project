import type { Application, RequestHandler, ErrorRequestHandler } from "express";
import express, { Router } from "express";
import { createServer, Server } from "http";
// import { validateToken } from "./middleware";

// defines the set of middleware that can be passed to the App constructor
type Middleware = RequestHandler | ErrorRequestHandler;

// defines the set of options that can be passed to the App constructor
export interface AppOptions {
    port: number | string;
    middleware?: Middleware[];
    apiRoutes?: Array<Router>;
    authRoutes?: Array<Router>;
    otherRoutes?: Middleware[];
    apiPath?: string;
    authPath?: string;
}

/*
 * App class
 * This class is responsible for creating the express application and
 * setting up the routes and middleware
 */
export default class App {
    public app: Application;
    public authPath: string;
    public apiPath: string;
    private port: number | string;

    /**
     * Constructor for the App class.
     * Creates an instance of the express application, sets the port to listen to, and
     * sets up middleware and routes.
     * @param {AppOptions} options - an object that specifies the options to create the app
     */
    constructor(options: AppOptions) {
        // create an instance of the express application
        this.app = express();

        // set the port to listen to
        this.port = this.normalizePort(options.port) as number;
        this.app.set("port", this.port);

        // set the api and auth paths
        this.apiPath = options.apiPath || "/api";
        this.authPath = options.authPath || "/auth";

        // set up middleware and routes
        this.middlewares(options.middleware);

        // set up routes
        this.apiRoutes(options.apiRoutes);
        this.authRoutes(options.authRoutes);

        this.otherRoutes(options.otherRoutes);
    }

    /**
     * Sets up middleware for the application
     * @param {Middleware[]} middleware - an array of middleware functions to use
     */
    private middlewares(middleware?: Middleware[]) {
        if (!middleware) return;
        middleware.forEach((m) => {
            this.app.use(m);
        });
    }

    /**
     * Adds middleware to the application
     * @param {Middleware} middleware - a middleware function to use
     */
    public addMiddleware(middleware?: Middleware) {
        if (!middleware) return;
        this.app.use(middleware);
    }

    /**
     * Sets up API routes for the application
     * @param {Array<Router>} routes - an array of router instances for the API
     */
    private apiRoutes(routes?: Array<Router>) {
        if (!routes) return;
        routes.forEach((r) => {
            this.app.use(this.apiPath, r);
        });
    }

    /**
     * Sets up authentication routes for the application
     * @param {Array<Router>} routes - an array of router instances for authentication
     */
    private authRoutes(routes?: Array<Router>) {
        if (!routes) return;
        routes.forEach((r) => {
            this.app.use(this.authPath, r);
        });
    }

    /**
     * Sets up other routes for the application
     * @param {Middleware[]} routes - an array of middleware functions for other routes
     */
    private otherRoutes(routes?: Middleware[]) {
        if (!routes) return;
        routes.forEach((r) => {
            this.app.use(r);
        });
    }

    /**
     * Starts the server to listen on the specified port
     */
    public listen() {
        const server: Server = createServer(this.app);
        server.listen(this.port);

        // handle specific listeners
        server.on("error", this.onError);
        server.on("listening", () => this.onListening(server));
    }

    /**
     * Handles the listening event for the server
     * @param {Server} server - the server to listen on
     */
    private onListening(server: Server): void {
        const addr = server.address();
        if (!addr) return;
        const bind =
            typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        console.log("Listening on " + bind);
    }

    /**
     * Handles the error event for the server
     * @param {NodeJS.ErrnoException} error - the error to handle
     * @throws - an error if the error is not handled
     */
    private onError(error: NodeJS.ErrnoException): void {
        // if not listening, throw error
        if (error.syscall !== "listen") {
            throw error;
        }

        const bind =
            typeof this.port === "string" ? "Pipe " + this.port : "Port " + this.port;

        // handle specific listeners
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Normalises the port number / pipe name
     * @param {?} val - the port number / pipe name to normalise
     * @returns {string | number} the normalised port number / pipe name
     * @throws {Error} error if the port number / pipe name is invalid
     */
    private normalizePort(val: unknown): string | number {
        if (typeof val === "number") {
            return val;
        }

        const port = parseInt(val as string, 10);

        if (!isNaN(port)) {
            // named pipe
            return port;
        }

        throw new Error("Invalid port");
    }
}
