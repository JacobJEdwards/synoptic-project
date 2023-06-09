import { AbstractPage as Page } from "@lib/components";
import type {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
  Params,
} from "@lib/types";

import { login } from "@services/auth.service";

export const loader: LoaderFunction<void> = async ({
  req,
  res,
}: LoaderArgs) => {
  if (req.session?.user) return res.redirect("/");
};

export const action: ActionFunction = async ({ req, res }: ActionArgs) => {
  if (!req.body) return res.redirect("/login");

  const { email, password } = req.body;

  const data = await login(email, password);

  console.log(data);

  if (data?.user && data?.jwt) {
    req.session.user = data.user;
    req.session.jwt = data.jwt;
    res.redirect("/profile");
    return {
      success: true,
    };
  } else {
    res.redirect("/login");
    return {
      success: false,
      error: "Invalid credentials",
    };
  }
};

export default class Login extends Page {
  constructor(params: Params, title = "Login") {
    super(params, title);
  }

  override async getHtml() {
    return `
            <section>
                <h1>Login</h1>
                <p class="form">Required information is marked with an asterisk (*)</p>
                ${
                  this.actionData?.success === false
                    ? `<p class="error">${this.actionData.error}</p>`
                    : ""
                }
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

  override async clientScript(): Promise<void> {
    return;
  }
}
