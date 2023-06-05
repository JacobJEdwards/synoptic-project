import { pathToRegex, getParams } from "./utils/urls.js";
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
        path: "/404",
        component: () => import("./views/pages/Error404.js"),
    },
];

/**
 * Router function
 * It will match the url path with the routes
 * If there is no match it will render the 404 page
 * If there is a match it will render the corresponding view
 */
const Router = async (pathname) => {
    /* Get the current url path */
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: pathname.match(pathToRegex(route.path)),
        };
    });

    /* Find the route that matches the url path */
    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.result !== null
    );

    /* If there is no match render the 404 page */
    if (!match) {
        match = {
            route: routes[4],
            result: [pathname],
        };
    }

    /* Render the view */
    const { default: Component, action, loader } = await match.route.component();
    const view = new Component(getParams(match));
    await view.init();

    return { view, action, loader};
};

export default Router;
