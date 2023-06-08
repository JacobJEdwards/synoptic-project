import type { Request, Response, NextFunction } from "express";

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
