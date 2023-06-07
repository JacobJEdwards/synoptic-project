/// <reference types="node" />
import type { Server } from "http";
import type { Request, Response, NextFunction, Application, RequestHandler, ErrorRequestHandler } from "express";
export type AppOptions = {
    port: unknown;
    middleware: Array<Middleware>;
};
export type Middleware = RequestHandler | ErrorRequestHandler;
export type ExpressCallback = (req: Request, res: Response, next: NextFunction, ...args: any) => void;
export default class App {
    app: Application;
    port: unknown;
    constructor({ port, middleware }: AppOptions);
    get(path: string, callback: ExpressCallback): void;
    post(path: string, callback: ExpressCallback): void;
    all(path: string, callback: ExpressCallback): void;
    use(path: string, callback: ExpressCallback): void;
    addErrorRoute(): void;
    applyMiddleware(middleware: Array<Middleware>): void;
    listen(): void;
    onListening(server: Server): void;
    onError(error: any): void;
    normalizePort(val: any): number | string | never;
}
//# sourceMappingURL=Application.d.ts.map