import { AbstractPage as Page } from "@lib/components"
import type { Params, LoaderArgs, LoaderFunction, ActionArgs, ActionFunction } from "@lib/types";

import { register } from "@services/auth.service";

export const loader: LoaderFunction<void> = async ({ req, res }: LoaderArgs) => {
    if (req?.session?.user) {
        console.log("User is already logged in", req.session.user);
        res.redirect("/");
        return;
    }

    return;
};

export const action: ActionFunction<void> = async ({ req, res }: ActionArgs) => {
    // edge cases
    if (!req.body) return res.redirect("/register");

    const { username, email, name, password } = req.body;

    const data = await register(username, email, password, name);

    if (data?.user && data?.jwt) {
        req.session.user = data.user;
        req.session.jwt = data.jwt;
        res.redirect("/");
    }

    res.redirect("/register");
};

export default class Register extends Page {
    constructor(params: Params, title = "Register") {
        super(params, title);
    }

    async getHtml() {
        return `
        <section class="register">
          <h1>Register</h1>
          <p class="form">Required information is marked with an asterisk (*)</p>
            <form id="register-form" action="/register" method="POST">
              <fieldset>
                  <legend>Register</legend>
                    <label class="label" for="username">Username*</label>
                    <input type="text" name="username" id="username" placeholder="Username" required />

                    <label class="label" for="email">Email*</label>
                    <input type="email" name="email" id="email" placeholder="Email" required />

                    <label class="label" for="name">Name*</label>
                    <input type="text" name="name" id="name" placeholder="Name" required />

                    <label class="label" for="password">Password*</label>
                    <input type="password" name="password" id="password" placeholder="Password" required />

                    <button id="register-button" type="submit">Register</button>

                    <p>Already have an account? <a href="/login">Login</a></p>
              </fieldset>
            </form>
        </section>
        `;
    }

    async clientScript(): Promise<void> {
        return;
    }
}
