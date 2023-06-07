import { NextFunction, Request, Response } from "express";
import Page from "./views/pages/AbstractPage"
import type { ExpressObject } from "./app.js";
import { ActionFunction } from "./types/Action.js";
import { LoaderFunction } from "./types/Loader.js";

import jsonRoutes from "./routes.json" //assert { type: "json" };

type Match = {
    result: RegExpMatchArray | null;
    // result will be null if route doesn't match current path, or an array with the full path and potential parameters
    route: Route;
};

export type Route = {
    path: string;
    component: () => Promise<any>;
};


/**
 * helper function to allow caching
 */
function deepEqual(x: any, y: any): boolean {
    const tx = typeof x;
    const ty = typeof y;

    return x && y && tx === "object" && tx === ty
        ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).every((key) => deepEqual(x[key], y[key]))
        : x === y;
}

export const routes: Route[] = jsonRoutes.map((route) => {
    return {
        path: route.urlPath,
        component: () => import(route.filePath)
    }
})

/**
 * Routes of the app
 * Each route has a path and a component
 * The path is used to match the url path
 * The component is the view that will be rendered
 */
// export const routes: Route[] = [
//     {
//         path: "/",
//         component: () => import("./views/pages/Dashboard"),
//     },
//     {
//         path: "/about",
//         component: () => import("./views/pages/About"),
//     },
//     {
//         path: "/charities",
//         component: () => import("./views/pages/Charities"),
//     },
//     {
//         path: "/recipes",
//         component: () => import("./views/pages/Recipes"),
//     },
//     {
//         path: "/recipes/new",
//         component: () => import("./views/pages/CreateRecipe"),
//     },
//     {
//         path: "/recipes/:id",
//         component: () => import("./views/pages/Recipe"),
//     },
//     {
//         path: "/login",
//         component: () => import("./views/pages/Login"),
//     },
//     {
//         path: "/register",
//         component: () => import("./views/pages/Register"),
//     },
//     {
//         path: "/logout",
//         component: () => import("./views/pages/Logout"),
//     },
//     {
//         path: "/404",
//         component: () => import("./views/pages/Error404"),
//     },
// ];


// Improved Router class
export class Router {
    routes: Set<Route>;
    matcher: RouterMatcher;
    match: Match | null;
    view: Page | null;
    action: ActionFunction | null;
    loader: LoaderFunction | null;

    constructor(routes: Route[]) {
        this.routes = new Set(routes);
        this.matcher = new RouterMatcher(routes);
        this.match = null;
        this.view = null;
        this.action = null;
        this.loader = null;
    }

    async reloadLoaderData(req: Request, res: Response, next: NextFunction) {
        const { loaderData } = await this.loadLoaderData(
            { view: this.view, action: this.action, loader: this.loader },
            req,
            res,
            next
        );
        return {
            view: this.view,
            action: this.action,
            loader: this.loader,
            loaderData,
        };
    }

    async loadView(pathname: string, { req, res, next }: ExpressObject) {
        const match = this.matcher.match(pathname);

        // if the component is already loaded, return it
        if (deepEqual(match, this.match) || !match?.route) {
            return await this.loadLoaderData(this, req, res, next);
        }

        this.match = match;

        // load the components module and create a new instance of the view
        const { view, action, loader, params } = await this.loadComponent(match);

        // if the user is logged in, pass the user to the view
        if (req?.session?.user && view) {
            view.user = req.session.user;
        }

        // load the loader data of the route defined in the component
        const { loaderData } = await this.loadLoaderData(
            { view, action, loader },
            req,
            res,
            next
        );

        // set the view, action and loader of the route
        this.view = view;
        this.action = action;
        this.loader = loader;

        return {
            view: this.view,
            action: this.action,
            loader: this.loader,
            loaderData,
        };
    }

    /**
     * Load the component of the route
     * @param {object} match
     * @returns {object} the compoenet, action and loader of the route
     */
    async loadComponent(match: Match) {
        const { default: View, action, loader } = await match.route.component();

        const params = this.getParams(match);

        const view = View ? new View(params) : null;

        return { view, action, loader, params };
    }

    /**
     * Load the loader data of the route
     * @param {object} component
     * @param {object} req
     * @param {object} res
     * @returns {object} the loader data of the route
     */
    async loadLoaderData({ view, loader, action }: any, req: Request, res: Response, next: NextFunction): Promise<any> {
        if (loader) {
            const params = view?.params ?? {};
            // load the loader data of the route
            const loaderData = await loader({
                params,
                req,
                res,
                next,
            });

            // give the view access to the loader data
            if (view) {
                view.loaderData = loaderData;
            }

            view ? (view.loaderData = loaderData) : null;

            return { view, loader, action, loaderData };
        }

        return { view, loader, action };
    }

    /**
     * Add a route to the router
     * Could be used to add routes dynamically
     * @param {object} route
     */
    addRoute(route: Route) {
        this.routes.add(route);
    }

    /**
     * get parameters from the url path
     * @param {object} match
     * @returns {object}
     */
    getParams(match: Match) {
        if (!match.result) return;

        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
            (result) => result[1]
        );

        return Object.fromEntries(
            keys.map((key, i) => {
                return [key, values[i]];
            })
        );
    }
}

/**
 * Class to match the url path with the routes
 * @class RouterMatcher
 * @memberof Router
 * @type {class}
 * @param {object[]} routes
 */
class RouterMatcher {
    routes: Route[];
    regexCache: Map<string, RegExp>;

    /**
     * Route object for the 404 page
     * Made it a static member so it can be accessed with ease
     * @static
     * @constant
     * @memberof RouterMatcher
     * @type {object}
     */
    static NOT_FOUND_ROUTE = {
        path: "/404",
        component: () => import("./views/pages/Error404"),
    };

    /**
     * Regex to get the parameters from the url path and return them as an object
     * Based on the route object
     * @static
     * @memberof RouterMatcher
     * @type {function}
     * @param {string} path
     * @returns {RegExp}
     */
    pathToRegex(path: string): RegExp {
        const sanitizedPath = path
            .replace(/\//g, "\\/")
            .replace(/:\w+/g, "([^\\/]+)");
        return new RegExp(`^${sanitizedPath}$`);
    }

    /**
     * @constructor
     * @memberof RouterMatcher
     * @param {object[]} routes
     * @returns {RouterMatcher}
     */
    constructor(routes: Route[]) {
        this.routes = routes;
        /* Cache the regex for each route */
        this.regexCache = new Map();
    }

    /**
     * Match the url path with the routes
     * @memberof RouterMatcher
     * @param {string} pathname
     * @returns {Match}
     */
    match(pathname: string): Match {
        /* Get the current url path */
        const potentialMatches = this.routes.map((route) => {
            let regex = this.regexCache.get(route.path);

            /* if the regex is not cached, cache it */
            if (!regex) {
                regex = this.pathToRegex(route.path);
                this.regexCache.set(route.path, regex);
            }

            return {
                route: route,
                result: pathname.match(regex),
            };
        });

        /* Find the route that matches the url path */
        let match = potentialMatches.find(
            (potentialMatch) => potentialMatch.result !== null
        );

        /* If there is no match render the 404 page */
        if (!match) {
            match = {
                route: RouterMatcher.NOT_FOUND_ROUTE,
                result: [pathname],
            };
        }

        return match;
    }
}

export default new Router(routes);