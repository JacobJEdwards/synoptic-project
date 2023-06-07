import { Templater } from "./Templater.js";
import { Router, routes } from "./Router.js";
import fs from "fs/promises";
import path from "path";

export class Renderer {
  constructor() {
    this.router = new Router(routes);
    this.templater = new Templater();
    this.filePath = path.resolve("src/views/index.html");

    this.pathname = null;
    this.view = null;
    this.action = null;
    this.loader = null;
  }

  async render(pathname, { req, res, next }) {
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

  async getComponent(pathname, { req, res, next }) {
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
  async generateHtml(view) {
    const data = {};
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
