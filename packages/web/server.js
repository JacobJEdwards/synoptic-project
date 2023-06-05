import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import fs from "fs/promises";
import path from "path";

// sessions
import session from "express-session";
import RedisStore from "connect-redis";
import redis from "redis";

// import middleware
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

import Router from "./src/Router.js";

// setup express app
const port = process.env.PORT || 3001;

const __dirname = process.cwd();

const app = express();
app.set("port", port);

// sessions
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.connect().catch((err) => {
  console.log("Redis error: ", err);
});

const redisStore = new RedisStore({
  client: redisClient,
  logErrors: true,
  prefix: "recipe-session",
});

// add middleware
// app.use(helmet());
// app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use("/src", express.static(path.resolve(__dirname, "src")));
app.use("/views", express.static(path.resolve(__dirname, "src", "views")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sessions
app.use(
  session({
    store: redisStore,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

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
    const session = req.session;
    const user = session?.user;

    const pathname = req.url.length > 0 ? req.url : "/";

    const { view } = await Router.loadView(pathname, req, res);
    const rendered = await view.serverRender(user);

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
    const pathname = req.url.length > 0 ? req.url : "/";
    const { action } = await Router.loadView(pathname);

    if (action) {
      const actionData = await action(req, res);
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
