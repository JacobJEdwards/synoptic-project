import type { Request, Response, NextFunction } from 'express';
export type ActionArgs = {
    req: Request;
    res: Response;
    next: NextFunction;
};
export type ActionFunction = (args: ActionArgs) => Promise<any>;
//# sourceMappingURL=Action.d.ts.map