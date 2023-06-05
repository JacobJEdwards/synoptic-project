require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const fs = require("fs/promises");
// const ssr = require("./ssr.js");

const path = require("path");

// import middleware
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

// setup express app
const port = process.env.PORT || 3001;

const app = express();
app.set("port", port);

// add middleware
// app.use(helmet());
// app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use("/src", express.static(path.resolve(__dirname, "src")));
app.use("/views", express.static(path.resolve(__dirname, "src", "views")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "src", "index.html"));
// });

/* SSR */
app.get("*", async (req, res, next) => {
    try {

        const { default: Router } = await import("./src/Router.js");
        const pathname = req.url.length > 0 ? req.url : "/";

        const { view } = await Router.loadView(pathname);
        const rendered = await view.serverRender();

        const html = await fs.readFile(
            path.resolve(__dirname, "src", "index.html"),
            "utf-8"
        );

        const finalHtml = html.replace(
            '<main id="app"></main>',
            `<main id="app">${rendered}</main>`
        );
        res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
    } catch (err) {
        next(err);
    }
});

app.post("*", async (req, res, next) => {
    try {

        const { default: Router } = await import("./src/Router.js");
        const pathname = req.url.length > 0 ? req.url : "/";
        const { action } = await Router.loadView(pathname);

        if (action) {
            await action(req, res);
        }

        if (!res.headersSent) {
            res.redirect(303, req.url);
        }
    } catch (err) {
        next(err);
    }
});

// create server
const server = createServer(app);
server.listen(port);

server.on("error", (err) => {
    console.log(err);
});

server.on("listening", () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Server is listening at http://${host}:${port}`);
});
