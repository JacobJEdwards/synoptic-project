import { getParams, pathToRegex } from "./utils/urls.js";

/**
 * Uses the history api to change the url without reloading the page
 * @param {string} url
 */
export const navigateTo = async (url) => {
  history.pushState(null, null, url);
  await Router();
};

/**
 * Initialize the app
 * Add the css files to the head of the document
 */
export function init() {
  const stylesheets = [];

  stylesheets.forEach((stylesheet) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = stylesheet;
    document.head.appendChild(link);
  });
}

/**
 * Routes of the app
 * Each route has a path and a component
 * The path is used to match the url path
 * The component is the view that will be rendered
 */
export const routes = [
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
const Router = async (url) => {
  /* Get the current url path */
  const path = url ? url : location.pathname;
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: path.match(pathToRegex(route.path)),
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
      result: [path],
    };
  }

  /* Render the view */
  const { default: Component } = await match.route.component();
  const view = new Component(getParams(match));
  await view.init();

  /* Render the view in the app tags */
  // document.querySelector("#app").innerHTML = await view.render();
  // await view.afterRender();
  // temp
  return await view.render();
};

export default Router;

/**
 * Initialize the app
 * Add the event listeners
 * Call the init function on page load
 */
// window.addEventListener("load", init());

/**
 * Add the event listener to the popstate event
 * Call the Router function on popstate
 * Call the Router function on page load
 */
// window.addEventListener("popstate", Router);

/**
 * Add the event listener to the DOMContentLoaded event
 * Add the event listener to the click event
 * On clicking a data-link element prevent the default behaviour
 * Call the navigateTo function with the href of the clicked element
 * Call the Router function instead of navigating to the href
 */
// document.addEventListener("DOMContentLoaded", () => {
// document.body.addEventListener("click", (e) => {
//     if (e.target.matches("[data-link]")) {
//         e.preventDefault();
//         navigateTo(e.target.href);
//     }
// });

// Router();
// });
