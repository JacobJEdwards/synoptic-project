import Page from "./AbstractPage.js";
import { register } from "../services/auth.service.js";

export const loader = async ({ req, res }) => {
  if (req.session.user) return res.redirect("/");
};

export const action = async ({ req, res }) => {
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
  constructor(params, title = "Register") {
    super(params, title);
  }

  async getHtml() {
    return `
        <section class="register">
            <h1>Register</h1>
            <form class="register-form" action="/register" method="POST">
                <div class="form-control">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" required />
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" required />
                </div>
                <div class="form-control">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Name" required />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required />
                </div>
                <div class="form-control">
                    <button type="submit">Register</button>
                </div>
            </form>
        </section>
        `;
  }
}
