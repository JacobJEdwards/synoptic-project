import type {ErrorRequestHandler, NextFunction, Request, RequestHandler, Response} from 'express';

export type Params = Record<string, string | number | boolean | undefined | null>;
export type Query = Record<string, string | number | boolean | undefined | null>;
export type Body = Record<string, any>;
export type Headers = Record<string, string>;

export type ExpressObject = {
    req: Request;
    res: Response;
    next: NextFunction;
};

export type ExpressCallback = (
    req: Request,
    res: Response,
    next: NextFunction,
    ...args: any
) => void;

export type Middleware = RequestHandler | ErrorRequestHandler;
