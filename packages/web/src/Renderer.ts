import { Templater } from "./Templater";
import { Router, routes } from "./Router";
import path from "path";
import { ExpressObject } from "./app";

export class Renderer {
    router: Router;
    templater: Templater;
    filePath: string;

    pathname: string | null;
    view: any | null;
    action: any | null;
    loader: any | null;

    constructor() {
        this.router = new Router(routes);
        this.templater = new Templater();
        this.filePath = path.resolve("src/views/index.html");

        this.pathname = null;
        this.view = null;
        this.action = null;
        this.loader = null;
    }

    async render(pathname: string, { req, res, next }: ExpressObject) {
        const { view, action, loader } = await this.router.loadView(pathname, {
            req,
            res,
            next,
        });

        this.pathname = pathname;
        this.view = view;
        this.action = action;
        this.loader = loader;

        if (view) {
            return await this.generateHtml(this.view);
        }

        return null;
    }

    async getComponent(pathname: string, { req, res, next }: ExpressObject) {
        if (this.pathname === pathname) {
            return { view: this.view, action: this.action, loader: this.loader };
        }

        this.pathname = pathname;

        const { view, action, loader } = await this.router.loadView(this.pathname, {
            req,
            res,
            next,
        });

        this.view = view;
        this.action = action;
        this.loader = loader;

        return { view, action, loader };
    }

    /* T extends AbstractPage */
    async generateHtml(view: any) {
        const data: any = {};
        data.content = await view.serverRender();
        data.title = view.title ?? "Recipe App";

        data.login = view.user
            ? `<a href="/logout">Logout</a>`
            : `<a href="/login">Login</a>`;

        const html = await this.templater.compileFileToString(this.filePath, data);

        return html;
    }
}

export default new Renderer();
