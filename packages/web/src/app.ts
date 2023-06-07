import * as dotenv from "dotenv";
dotenv.config();

import Application from "./app/Application";
import middleware from "./app/middleware/app.middleware";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import asyncHandler from "./app/asyncHandler";
import path from "path";

import Renderer from "./Renderer";

/* Set up */
const port = process.env.PORT || 3001;

export type ExpressObject = {
    req: Request;
    res: Response;
    next: NextFunction;
};

const AppOptions = {
    port: port,
    middleware: middleware,
};

/* Express app wrapper instance */
const app = new Application(AppOptions);

// const __dirname = process.cwd();

app.use("/views", express.static(path.resolve(__dirname, "views")));

/* SSR */

/**
 * Methods used to handle any GET request
 * HTML and JavaScript are evaluated on the server
 */
const handleGet = async (
    pathname: string,
    { req, res, next }: ExpressObject
) => {
    // returns an instance of the view object corresponding to the URL path

    // gets the rendered HTML from the view object and passes the user object to the view (may be undefined)

    // if the headers have already been sent (i.e. from the loader function), return

    // otherwise, read the index.html file and replace the main element with the rendered HTML
    const html = await Renderer.render(pathname, { req, res, next });

    if (res.headersSent) return;

    const response = html ? html : "Not Found";

    // send the final HTML to the client
    res.status(200).set({ "Content-Type": "text/html" }).end(response);
};

/**
 * Methods used to handle any POST request
 */
const handlePost = async (
    pathname: string,
    { req, res, next }: ExpressObject
) => {
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
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
