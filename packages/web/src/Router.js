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

class Router {
  constructor(routes) {
    this.routes = routes;
    this.match = null;
    this.component = null;
    this.action = null;
    this.loader = null;
  }

  getMatch(pathname) {
    /* Get the current url path */
    const potentialMatches = this.routes.map((route) => {
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

    return match;
  }

  async loadView(pathname) {
    const match = this.getMatch(pathname);

    if (match === this.match) {
      return { view: this.component, action: this.action, loader: this.loader };
    }

    this.match = match;

    /* Render the view */
    const {
      default: Component,
      action,
      loader,
    } = await match.route.component();
    const view = new Component(getParams(match));

    if (loader) {
      const loaderData = await loader(view.params);
      view.loaderData = loaderData;
    }

    this.component = view;
    this.action = action;
    this.loader = loader;

    return { view, action, loader };
  }
}

/**
 * Router function
 * It will match the url path with the routes
 * If there is no match it will render the 404 page
 * If there is a match it will render the corresponding view
 */
// const Router = async (pathname) => {
//   /* Get the current url path */
//   const potentialMatches = routes.map((route) => {
//     return {
//       route: route,
//       result: pathname.match(pathToRegex(route.path)),
//     };
//   });
//
//   /* Find the route that matches the url path */
//   let match = potentialMatches.find(
//     (potentialMatch) => potentialMatch.result !== null
//   );
//
//   /* If there is no match render the 404 page */
//   if (!match) {
//     match = {
//       route: routes[4],
//       result: [pathname],
//     };
//   }
//
//   /* Render the view */
//   const { default: Component, action, loader } = await match.route.component();
//   const view = new Component(getParams(match));
//   if (loader) {
//     const loaderData = await loader(view.params);
//     view.loaderData = loaderData;
//   }
//
//   return { view, action, loader };
// };

export default new Router(routes);
