import Dashboard from "/views/pages/Dashboard.js";
import About from "/views/pages/About.js";
import Charities from "/views/pages/Charities.js";
import Recipes from "/views/pages/Recipes.js";
import Error404 from "/views/pages/Error404.js";
import Recipe from "/views/pages/Recipe.js";
import CreateRecipe from "/views/pages/CreateRecipe.js";

import { getParams, pathToRegex } from "/utils/urls.js";

/**
 * Uses the history api to change the url without reloading the page
 * @param {string} url
 */
const navigateTo = async (url) => {
  history.pushState(null, null, url);
  await Router();
};

/**
 * Initialize the app
 * Add the css files to the head of the document
 */
function init() {
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
const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/charities",
    component: Charities,
  },
  {
    path: "/recipes",
    component: Recipes,
  },
  {
    path: "/recipes/new",
    component: CreateRecipe,
  },
  {
    path: "/recipes/:id",
    component: Recipe,
  },
  {
    path: "/404",
    component: Error404,
  },
];

/**
 * Router function
 * It will match the url path with the routes
 * If there is no match it will render the 404 page
 * If there is a match it will render the corresponding view
 */
const Router = async () => {
  /* Get the current url path */
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
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
      result: [location.pathname],
    };
  }

  /* Render the view */
  const view = new match.route.component(getParams(match));
  await view.init();

  /* Render the view in the app tags */
  document.querySelector("#app").innerHTML = await view.render();
  await view.afterRender();
};

/**
 * Initialize the app
 * Add the event listeners
 * Call the init function on page load
 */
window.addEventListener("load", init());

/**
 * Add the event listener to the popstate event
 * Call the Router function on popstate
 * Call the Router function on page load
 */
window.addEventListener("popstate", Router);

/**
 * Add the event listener to the DOMContentLoaded event
 * Add the event listener to the click event
 * On clicking a data-link element prevent the default behaviour
 * Call the navigateTo function with the href of the clicked element
 * Call the Router function instead of navigating to the href
 */
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  Router();
});
