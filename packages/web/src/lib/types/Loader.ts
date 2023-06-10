import type {NextFunction, Request, Response} from "express";

// type params

export type LoaderArgs = {
    req: Request;
    res: Response;
    next: NextFunction;
    params: any;
};

export type LoaderReturn<T> = {
    success: boolean;
    data?: T;
    error?: string;
} | void | T;

export type LoaderFunction<T = any> = (
    args: LoaderArgs
) => Promise<LoaderReturn<T>>;
