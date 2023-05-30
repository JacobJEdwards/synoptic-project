// Purpose: Error handling middleware for express
import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler,
} from "express";
import { StatusCodes } from "../utils";

/**
 * Error handling middleware for express
 * @param {?} err - Error object thrown by express
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} _next - Express next function (unused)
 * @returns {Response} res Express response object with error message
 */
const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);

  // res interface is extended to include statusCode
  // if it is not present, set it to 500 or 400 depending on the error
  const statusCode =
    res.statusCode && res.statusCode !== StatusCodes.OK
      ? res.statusCode
      : err instanceof Error
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({ error: err });
};

/**
 * Request handler for non-existent endpoints
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} _next - Express next function (unused)
 * @returns {Response} res - Express response object with error message
 */
const notFound: RequestHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "Endpoint does not exist" });
};

export default [errorHandler, notFound];
