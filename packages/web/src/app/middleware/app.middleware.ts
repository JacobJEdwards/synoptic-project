import cors from "cors";
import helmet from "helmet";
import morgran from "morgan";
import compression from "compression";
import session from "express-session";
import express from "express";
import redisStore from "./redis";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
    jwt: string;
  }
}

const middleware: Array<any> = [
  // cors(),
  // helmet(),
  morgran("dev"),
  compression(),
  express.json(),
  express.urlencoded({ extended: true }),
  session({
    store: redisStore,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 24,
    },
  }),
];

export default middleware;
