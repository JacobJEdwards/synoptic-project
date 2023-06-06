import * as dotenv from "dotenv";
dotenv.config();

import Application from "./app/Application.js";
import middleware from "./app/middleware/app.middleware.js";
import express from "express";
import asyncHandler from "./app/asyncHandler.js";
import fs from "fs/promises";
import path from "path";

import Renderer from "./Renderer.js";

/* Set up */
const port = process.env.PORT || 3001;

const AppOptions = {
  port: port,
  middleware: middleware,
};

/* Express app wrapper instance */
const app = new Application(AppOptions);

const __dirname = process.cwd();

app.use("/views", express.static(path.resolve(__dirname, "src", "views")));

/* SSR */

/**
 * Methods used to handle any GET request
 * HTML and JavaScript are evaluated on the server
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const handleGet = async (pathname, { req, res, next }) => {
  // returns an instance of the view object corresponding to the URL path

  // gets the rendered HTML from the view object and passes the user object to the view (may be undefined)

  // if the headers have already been sent (i.e. from the loader function), return

  // dont really like where this is located, might be best to generate all this elsewhere. in router or separate? Renderer class?

  // if (!req.session?.user) {
  //     const { default: Link } = await import(
  //         path.resolve(__dirname, "src", "views", "components", "Link.js")
  //     );
  //     data.login = new Link({
  //         href: "/login",
  //         text: "Login",
  //     }).render();
  // }

  if (res.headersSent) return;

  // otherwise, read the index.html file and replace the main element with the rendered HTML
  const html = await Renderer.render(pathname, { req, res, next });

  // send the final HTML to the client
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
};

/**
 * Methods used to handle any POST request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const handlePost = async (pathname, { req, res, next }) => {
  // if an action function has been exported from the view, execute it
  // the action function allows a component to handle a POST request
  const { action, view } = await Renderer.getComponent(pathname, {
    req,
    res,
    next,
  });

  if (action) {
    const actionData = await action({ req, res, next });
    view.actionData = actionData;
  }

  // if the headers have not been sent in the action function, redirect to the current URL to avoid resending POST requests
  if (!res.headersSent) {
    res.redirect(req.url);
  }
};

/* Catch-all route */
app.all(
  "*",
  asyncHandler(async (req, res, next) => {
    const method = req.method;
    const pathname = req.url;

    // handle GET and POST requests
    switch (method) {
      case "GET":
        await handleGet(pathname, { req, res, next });
        break;

      case "POST":
        await handlePost(pathname, { req, res, next });
        break;

      default:
        res.status(404).send("Not Found");
    }
  })
);

app.listen();
