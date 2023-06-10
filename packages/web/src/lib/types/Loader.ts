import type {NextFunction, Request, Response} from "express";
import { Params } from "./Requests";

// type params

export type LoaderArgs = {
    req: Request;
    res: Response;
    next: NextFunction;
    params: Params;
    queryParams: URLSearchParams;
};

export type LoaderReturn<T> = {
    success: boolean;
    data?: T;
    error?: string;
} | void | T;

export type LoaderFunction<T = any> = (
    args: LoaderArgs
) => Promise<LoaderReturn<T>>;
