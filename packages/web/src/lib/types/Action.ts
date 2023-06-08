import type { Request, Response, NextFunction } from 'express';

export type ActionArgs = {
    req: Request;
    res: Response;
    next: NextFunction;
};

export type ActionFunction<T = any> = (args: ActionArgs) => Promise<T>;
