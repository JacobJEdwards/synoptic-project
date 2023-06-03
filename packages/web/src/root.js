import Dashboard from "/views/pages/Dashboard.js";
import About from "/views/pages/About.js";
import Charities from "/views/pages/Charities.js";
import Recipes from "/views/pages/Recipes.js";
import Error404 from "/views/pages/Error404.js";
import Recipe from "/views/pages/Recipe.js";

const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
    const values = match.result.slice(1);
    console.log(values);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
        (result) => result[1]
    );

    return Object.fromEntries(
        keys.map((key, i) => {
            return [key, values[i]];
        })
    );
};

const navigateTo = (url) => {
    history.pushState(null, null, url);
    Router();
};

function init() {
    const stylesheets = ["/views/css/index.css"];

    stylesheets.forEach((stylesheet) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = stylesheet;
        document.head.appendChild(link);
    });
}

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
        path: "/recipes/:id",
        component: Recipe,
    },
    {
        path: "/404",
        component: Error404,
    },
];

const Router = async () => {
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        };
    });

    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.result !== null
    );

    if (!match) {
        match = {
            route: routes[4],
            result: [location.pathname],
        };
    }

    const view = new match.route.component(getParams(match));

    document.querySelector("#app").innerHTML = await view.render();
    await view.afterRender();
};

window.addEventListener("load", () => {
    init();
});

window.addEventListener("popstate", Router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    Router();
});
