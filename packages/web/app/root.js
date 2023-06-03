import Dashboard from "./views/pages/Dashboard.js";
import About from "./views/pages/About.js";
import Charities from "./views/pages/Charities.js";
import Recipes from "./views/pages/Recipes.js";

const routes = [
    {
        path: "/",
        component: Dashboard,
        exact: true,
    },
    {
        path: "/about",
        component: About,
        exact: true,
    },
    {
        path: "/charities",
        component: Charities,
        exact: true,
    },
    {
        path: "/recipes",
        component: Recipes,
        exact: true,
    },
];

const Router = async () => {
    const path = window.location.pathname;
    const route = routes.find((r) => r.path === path) || routes[0];
    const view = new route.component();

    document.querySelector("#app").innerHTML = await view.render();
    await view.afterRender();
};

window.addEventListener("popstate", Router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            Router();
        }
    });

    Router();
});
