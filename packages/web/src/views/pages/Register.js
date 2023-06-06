import Page from "./AbstractPage.js";
import { register } from "../services/auth.service.js";

export const action = async ({ req, res }) => {
  // edge cases
  if (!req.body) return res.redirect("/register");
  if (req.session.user) return res.redirect("/");

  const { username, email, name, password } = req.body;

  const data = await register(username, email, password, name);

  if (data?.user && data?.jwt) {
    req.session.user = data.user;
    req.session.jwt = data.jwt;
    res.redirect("/");
  }

  res.redirect("/login");
};

export default class Register extends Page {
  constructor(params, title = "Register") {
    super(params, title);
  }

  async getHtml() {
    return `
            <h1>Register</h1>
            <form id="register-form">
                <input type="text" id="username" placeholder="Username" />
                <input type="email" id="email" placeholder="Email" />
                <input type="text" id="name" placeholder="Name" />
                <input type="password" id="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        `;
  }
}
