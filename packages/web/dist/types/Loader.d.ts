import type { Request, Response, NextFunction } from 'express';
export type LoaderArgs = {
    req: Request;
    res: Response;
    next: NextFunction;
    params: any;
};
export type LoaderFunction = (args: LoaderArgs) => Promise<any>;
//# sourceMappingURL=Loader.d.ts.map