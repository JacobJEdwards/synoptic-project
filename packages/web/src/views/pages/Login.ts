import Page from "./AbstractPage";
import { login } from "../services/auth.service.js";
import type { Request, Response } from "express";
import type { LoaderFunction, LoaderArgs } from "../../types/Loader"
import type { ActionFunction, ActionArgs } from "../../types/Action"

export const loader: LoaderFunction = async ({ req, res }: LoaderArgs) => {
    if (req.session?.user) return res.redirect("/");
};

export const action: ActionFunction = async ({ req, res }: ActionArgs) => {
    if (!req.body) return res.redirect("/login");

    const { email, password } = req.body;

    const data = await login(email, password);

    if (data?.user && data?.jwt) {
        req.session.user = data.user;
        req.session.jwt = data.jwt;
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
};

export default class Login extends Page {
    constructor(params: any, title = "Login") {
        super(params, title);
    }

    async getHtml() {
        return `
            <h1>Login</h1>
            <section>
                <form class="login-form" action="/login" method="POST">
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    <div class="form-control">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div>
                    <a href="/register">Register</a>
                </div>
            </section>
        `;
    }

    async clientScript(): Promise<void> {
        return;
    }
}