import type {NextFunction, Request, Response} from "express";

export default function asyncHandler(
    fn: (
        req: Request,
        res: Response,
        next: NextFunction,
        ...args: any[]
    ) => Promise<void>
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
        ...args: any
    ) => {
        try {
            await fn(req, res, next, ...args);
        } catch (err) {
            next(err);
        }
    };
}
