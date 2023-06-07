import type { Request, Response, NextFunction } from "express";
export default function asyncHandler(fn: (req: Request, res: Response, next: NextFunction, ...args: any[]) => Promise<void>): (req: Request, res: Response, next: NextFunction, ...args: any) => Promise<void>;
//# sourceMappingURL=asyncHandler.d.ts.map