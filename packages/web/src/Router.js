/**
 * type Match = {
 *      path: string,
 *      result: null | Array<string[]>
 * }
 *
 * result will be null if route doesn't match current path, or an array with the full path and potential parameters
 */

/**
 * Routes of the app
 * Each route has a path and a component
 * The path is used to match the url path
 * The component is the view that will be rendered
 */
const routes = [
    {
        path: "/",
        component: () => import("./views/pages/Dashboard.js"),
    },
    {
        path: "/about",
        component: () => import("./views/pages/About.js"),
    },
    {
        path: "/charities",
        component: () => import("./views/pages/Charities.js"),
    },
    {
        path: "/recipes",
        component: () => import("./views/pages/Recipes.js"),
    },
    {
        path: "/recipes/new",
        component: () => import("./views/pages/CreateRecipe.js"),
    },
    {
        path: "/recipes/:id",
        component: () => import("./views/pages/Recipe.js"),
    },
    {
        path: "/login",
        component: () => import("./views/pages/Login.js"),
    },
    {
        path: "/register",
        component: () => import("./views/pages/Register.js"),
    },
    {
        path: "logout",
        component: () => import("./views/pages/Logout.js"),
    },
    {
        path: "/404",
        component: () => import("./views/pages/Error404.js"),
    },
];

// Improved Router class
class Router {
    constructor(routes) {
        this.routes = new Set(routes);
        this.matcher = new RouterMatcher(routes);
        this.match = null;
        this.view = null;
        this.action = null;
        this.loader = null;
    }

    async loadView(pathname, req, res, next) {
        const match = this.matcher.match(pathname);

        // if the component is already loaded, return it
        if (match === this.match || !match?.route) {
            return { view: this.view, action: this.action, loader: this.loader };
        }

        this.match = match;

        // load the components module and create a new instance of the view
        const component = await this.loadComponent(match);

        // if the user is logged in, pass the user to the view
        if (req?.session?.user) {
            component.view.user = req.session.user;
        }

        // load the loader data of the route defined in the component
        const loaderData = await this.loadLoaderData(component, req, res, next);

        // set the view, action and loader of the route
        this.view = component.view;
        this.action = component.action;
        this.loader = component.loader;

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
    async loadComponent(match) {
        const { default: View, action, loader } = await match.route.component();

        const view = new View(this.getParams(match));

        return { view, action, loader, params: view.params };
    }

    /**
     * Load the loader data of the route
     * @param {object} component
     * @param {object} req
     * @param {object} res
     * @returns {object} the loader data of the route
     */
    async loadLoaderData(component, req, res, next) {
        if (component.loader) {
            // load the loader data of the route
            const loaderData = await component.loader({
                params: component.view.params,
                req,
                res,
                next,
            });

            // give the view access to the loader data
            component.view.loaderData = loaderData;
            return loaderData;
        }
        return null;
    }

    /**
     * Add a route to the router
     * Could be used to add routes dynamically
     * @param {object} route
     */
    addRoute(route) {
        this.routes.add(route);
    }

    /**
     * get parameters from the url path
     * @param {object} match
     * @returns {object}
     */
    getParams(match) {
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
        component: () => import("./views/pages/Error404.js"),
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
    // pathToRegex(path) {
    //     // return new RegExp(
    //     //     "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
    //     // );
    //     return new RegExp(
    //         `^${path.replace(/\//g, "\\/").replace(/:\w+/g, "([^\\/]+)")}$`
    //     );
    // }
    pathToRegex(path) {
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
    constructor(routes) {
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
    match(pathname) {
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
                route: this.NOT_FOUND_ROUTE,
                result: [pathname],
            };
        }

        return match;
    }
}

export default new Router(routes);
