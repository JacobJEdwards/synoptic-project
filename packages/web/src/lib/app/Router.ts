import { AbstractPage as Page } from "@lib/components";
import { deepEqual } from "@lib/utils";

import type {
    ActionFunction,
    LoaderFunction,
    LinksFunction,
    MetaFunction,
    ExpressObject,
    Params,
    HtmlMeta,
    HtmlLink,
    HtmlScript,
    ScriptsFunction,
} from "@lib/types"

import jsonRoutes from "@/routes.json" //assert { type: "json" };

export type ComponentObject<T = any> = {
    view: Page | null;
    action: ActionFunction<T> | null;
    loader: LoaderFunction<T> | null;
    meta: MetaFunction | null;
    links: LinksFunction | null;
    scripts: ScriptsFunction | null;
};

export type ComponentImport = {
    default?: typeof Page;
    action?: ActionFunction;
    loader?: LoaderFunction;
    meta?: MetaFunction;
    links?: LinksFunction;
    scripts?: ScriptsFunction
};

export type Match = {
    result: RegExpMatchArray | null;
    // result will be null if route doesn't match current path, or an array with the full path and potential parameters
    route: Route;
    queryParams: URLSearchParams;
};

export type Route = {
    path: string;
    component: () => Promise<any>;
};



export const routes: Route[] = jsonRoutes.map((route) => {
    return {
        path: route.urlPath,
        component: () => import(`../../views/pages/${route.fileName}`)
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
export default class Router {
    routes: Set<Route>;
    matcher: RouterMatcher;
    match: Match | null;
    view: Page | null;
    action: ActionFunction | null;
    loader: LoaderFunction | null;
    links: LinksFunction | null;
    meta: MetaFunction | null;
    scripts: ScriptsFunction | null;

    constructor(routes: Route[]) {
        this.routes = new Set(routes);
        this.matcher = new RouterMatcher(routes);
        this.match = null;
        this.view = null;
        this.action = null;
        this.loader = null;
        this.links = null;
        this.meta = null;
        this.scripts = null;
    }

    async reloadLoaderData({ req, res, next }: ExpressObject) {
        const { loaderData } = await this.loadLoaderData(
            { view: this.view, action: this.action, loader: this.loader, meta: this.meta, links: this.links, scripts: this.scripts },
            {
                req,
                res,
                next
            }
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
            return await this.loadLoaderData({ view: this.view, loader: this.loader, action: this.action, meta: this.meta, links: this.links, scripts: this.scripts }, { req, res, next });
        }


        this.match = match;

        // load the components module and create a new instance of the view
        const { view, action, loader, meta, links, scripts } = await this.loadComponent(match);

        // if the user is logged in, pass the user to the view
        if (req?.session?.user && view) {
            view.user = req.session.user;
        }

        // load the loader data of the route defined in the component
        const { loaderData } = await this.loadLoaderData(
            { view, action, loader, meta, links, scripts },
            {
                req,
                res,
                next
            }
        );

        // set the view, action and loader of the route
        this.view = view;
        this.action = action;
        this.loader = loader;
        this.meta = meta;
        this.links = links;
        this.scripts = scripts;

        return {
            view: this.view,
            action: this.action,
            loader: this.loader,
            meta: this.meta,
            links: this.links,
            scripts: this.scripts,
            loaderData,
        };
    }

    /**
     * Load the component of the route
     * @param {Match} match
     * @returns {ComponentObject} the compoenet, action and loader of the route
     */
    async loadComponent(match: Match): Promise<ComponentObject> {
        const { default: View, action, loader, meta, links, scripts } = await match.route.component();

        const params: Params = this.getParams(match);
        const queryParams = match.queryParams;

        const view = View ? new View(params) : null;

        view ? (view.queryParams = queryParams) : null;


        return { view, action: action ?? null, loader: loader ?? null, meta: meta ?? null, links: links ?? null, scripts: scripts ?? null };
    }

    /**
     * Load the loader data of the route
     * @param {ComponentObject} component
     * @param {ExpressObject} express
     * @returns {any} the loader data of the route
     */
    async loadLoaderData({ view, loader, action, meta, links, scripts }: ComponentObject, { req, res, next }: ExpressObject): Promise<any> {
        if (loader) {
            const params = view?.params ?? {};
            const queryParams = view?.queryParams ?? new URLSearchParams();
            // load the loader data of the route
            const loaderData = await loader({
                params,
                queryParams,
                req,
                res,
                next,
            });

            const metaData: HtmlMeta[] | null = meta ? meta() : null;
            const linkData: HtmlLink[] | null = links ? links() : null;
            const scriptData: HtmlScript[] | null = scripts ? scripts() : null;

            // give the view access to the loader data
            if (view) {
                view.loaderData = loaderData;
                view.meta = metaData;
                view.links = linkData;
                view.scripts = scriptData;
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
     * @param {Match} match
     * @returns {Params}
     */
    getParams(match: Match): Params {
        if (!match.result) return {};

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
 */
export class RouterMatcher {
    routes: Route[];
    regexCache: Map<string, RegExp>;

    /**
     * Route object for the 404 page
     * Made it a static member so it can be accessed with ease
     * @static
     * @constant
     * @memberof RouterMatcher
     * @type {Route}
     */
    static NOT_FOUND_ROUTE: Route = {
        path: "/404",
        component: () => import("@/views/pages/Error404"),
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
     * @param {Route[]} routes
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
        const [pathWithoutHash = pathname] = pathname.split('#');
        const [pathWithoutQuery, queryString] = pathWithoutHash.split('?');
        const parameters = pathWithoutQuery || pathname;
        const queryParams = new URLSearchParams(queryString);

        const potentialMatches = this.routes.map(route => {
            const regex = this.regexCache.get(route.path) || this.pathToRegex(route.path);
            this.regexCache.set(route.path, regex);

            return {
                route,
                result: parameters.match(regex),
                queryParams
            };
        });

        const match = potentialMatches.find(potentialMatch => potentialMatch.result !== null) || {
            route: RouterMatcher.NOT_FOUND_ROUTE,
            result: [pathname],
            queryParams
        };

        return match;
    }
}

