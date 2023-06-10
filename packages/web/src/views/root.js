import Router from "./Router.js";

/**
 * Uses the history api to change the url without reloading the page
 * @param {string} url
 */
export const navigateTo = async (url) => {
    history.pushState(null, null, url);
    await Render();
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

const Render = async () => {
    const {view} = await Router.loadView(location.pathname);

    /* Render the view in the app tags */
    //document.querySelector("#app").innerHTML = await view.render();
    await view.clientRender();
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
window.addEventListener("popstate", Render);

/**
 * Add the event listener to the DOMContentLoaded event
 * Add the event listener to the click event
 * On clicking a data-link element prevent the default behaviour
 * Call the navigateTo function with the href of the clicked element
 * Call the Router function instead of navigating to the href
 */
document.addEventListener("DOMContentLoaded", () => {
    // document.body.addEventListener("click", (e) => {
    //   if (e.target.matches("[data-link]")) {
    //     e.preventDefault();
    //     navigateTo(e.target.href);
    //   }
    // });

    Render();
});
