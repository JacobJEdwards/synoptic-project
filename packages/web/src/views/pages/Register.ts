import {AbstractPage as Page} from "@lib/components"
import type {ActionArgs, ActionFunction, LoaderArgs, LoaderFunction, Params} from "@lib/types";

import {register} from "@services/auth.service";

export const loader: LoaderFunction<void> = async ({req, res}: LoaderArgs) => {
    if (req?.session?.user) {
        console.log("User is already logged in", req.session.user);
        res.redirect("/");
        return;
    }

    return;
};

export const action: ActionFunction<void> = async ({req, res}: ActionArgs) => {
    // edge cases
    if (!req.body) {
        res.redirect("/register");
        return {
            success: false,
            error: "No data was sent",
        }
    }

    const {username, email, name, password} = req.body;

    const data = await register(username, email, password, name);

    if (data?.user && data?.jwt) {
        req.session.user = data.user;
        req.session.jwt = data.jwt;
        res.redirect("/");
        return 
    }

    res.redirect("/register");
    return {
        success: false,
        error: "Something went wrong",
    }
};

export default class Register extends Page {
    constructor(params: Params, title = "Register") {
        super(params, title);
    }

    override async getHtml() {
        return `
        <section class="register">
          <h1>Register</h1>
          <p class="form">Required information is marked with an asterisk (*)</p>
                ${
                  this.actionData?.success === false
                    ? `<p class="error">${this.actionData.error}</p>`
                    : ""
                }
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

    override async clientScript(): Promise<void> {
        return;
    }
}
