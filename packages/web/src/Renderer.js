import { Templater } from "./Templater.js";
import { Router, routes } from "./Router.js";
import fs from "fs/promises";
import path from "path";

class Renderer {
    constructor() {
        this.templater = new Templater();
        this.router = new Router(routes);
        this.filePath = path.resolve("src/views/index.html");
        this.pathname = null;
        this.view = null;
        this.action = null;
        this.loader = null;
    }

    async render(pathname, { req, res, next }) {
        // if path hasnt changed, return the view
        console.log("pathname", pathname);
        console.log("this.pathname", this.pathname);
        if (pathname === this.pathname) {
            return await this.view.serverRender();
        }

        const { view, loader, action } = await this.loadView(
            pathname,
            req,
            res,
            next
        );

        this.pathname = pathname;

        return await this.generateHtml(view);
    }

    async generateHtml(view) {
        const data = {};
        data.content = await view.serverRender();
        data.title = view.title ?? "Recipe App";

        const html = await this.templater.compileFileToString(this.filePath, data);

        return html;
    }

    async loadView(pathname, req, res, next) {
        if (pathname === this.pathname) {
            return {
                view: this.view,
                action: this.action,
                loader: this.loader,
            };
        }

        const { default: component, params } = await this.router.getComponent(
            pathname
        );

        const { view, action, loader } = await this.loadComponent(
            component,
            params
        );

        const loaderData = await this.loadLoaderData(
            { view, action, loader },
            req,
            res,
            next
        );

        this.view = view;
        this.action = action;
        this.loader = loader;

        return {
            view: this.view,
            action: this.action,
            loader: this.loader,
        };
    }

    /**
     * Load the component of the route
     * @param {object} match
     * @returns {object} the compoenet, action and loader of the route
     */
    async loadComponent(component, params) {
        const { default: View, action, loader } = await component();

        const view = new View(params);

        return { view, action, loader };
    }

    /**
     * Load the loader data of the route
     * @param {object} component
     * @param {object} req
     * @param {object} res
     * @returns {object} the loader data of the route
     */
    async loadLoaderData(component, req, res, next) {
        if (req?.session?.user) {
            component.view.user = req.session.user;
        }

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

    async executeAction(pathname, req, res, next) {
        const { action } = await this.loadView(pathname, req, res, next);

        if (action) {
            const actionData = await action({ req, res, next });
            if (actionData) {
                view.actionData = actionData;
            }
        }
    }
}

export default new Renderer();
