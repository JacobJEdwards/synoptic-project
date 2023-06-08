import type { Request, Response, NextFunction } from "express";

export type ActionArgs = {
  req: Request;
  res: Response;
  next: NextFunction;
};

export type ActionReturn<T> = {
  success: boolean;
  data?: T;
  error?: string;
} | void | T;

export type ActionFunction<T = any> = (
  args: ActionArgs
) => Promise<ActionReturn<T>>;
