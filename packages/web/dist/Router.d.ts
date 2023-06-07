import { NextFunction, Request, Response } from "express";
import Page from "./views/pages/AbstractPage";
import type { ExpressObject } from "./app.js";
import { ActionFunction } from "./types/Action.js";
import { LoaderFunction } from "./types/Loader.js";
type Match = {
    result: RegExpMatchArray | null;
    route: Route;
};
export type Route = {
    path: string;
    component: () => Promise<any>;
};
export declare const routes: Route[];
export declare class Router {
    routes: Set<Route>;
    matcher: RouterMatcher;
    match: Match | null;
    view: Page | null;
    action: ActionFunction | null;
    loader: LoaderFunction | null;
    constructor(routes: Route[]);
    reloadLoaderData(req: Request, res: Response, next: NextFunction): Promise<{
        view: Page | null;
        action: ActionFunction | null;
        loader: LoaderFunction | null;
        loaderData: any;
    }>;
    loadView(pathname: string, { req, res, next }: ExpressObject): Promise<any>;
    loadComponent(match: Match): Promise<{
        view: any;
        action: any;
        loader: any;
        params: any;
    }>;
    loadLoaderData({ view, loader, action }: any, req: Request, res: Response, next: NextFunction): Promise<any>;
    addRoute(route: Route): void;
    getParams(match: Match): any;
}
declare class RouterMatcher {
    routes: Route[];
    regexCache: Map<string, RegExp>;
    static NOT_FOUND_ROUTE: {
        path: string;
        component: () => Promise<typeof import("./views/pages/Error404")>;
    };
    pathToRegex(path: string): RegExp;
    constructor(routes: Route[]);
    match(pathname: string): Match;
}
declare const _default: Router;
export default _default;
//# sourceMappingURL=Router.d.ts.map