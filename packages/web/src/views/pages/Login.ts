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
            <section>
                <h1>Login</h1>
                <p class="form">Required information is marked with an asterisk (*)</p>
                <form id="login-form" action="/login" method="POST">
                    <fieldset>
                        <legend>Login</legend>
                        <label class="label" for="email">Email*</label>
                        <input type="email" id="email" name="email" placeholder="Email" required />

                        <label class="label" for="password">Password*</label>
                        <input type="password" id="password" name="password" placeholder="Password" required />

                        <button id="login-button" type="submit">Login</button>

                        <p id="p-reg">Don't have an account? <a href="/register">Register here.</a></p>
                    </fieldset>
                </form>
            </section>
        `;
    }

    async clientScript(): Promise<void> {
        return;
    }
}
