import Page from "./AbstractPage.js";
import { login } from "../services/auth.service.js";

export const action = async (req, res) => {
  const { email, password } = req.body;
  const data = await login(email, password);
  if (data?.user && data?.jwt) {
    req.session.user = data.user;
    req.session.jwt = data.jwt;
    res.redirect("/");
  }
  console.log(data);
  res.redirect("/login");
};

export default class Login extends Page {
  constructor(params, title = "Login") {
    super(params, title);
  }

  async getHtml() {
    return `
            <h1>Login</h1>
            <form id="login-form" method="POST">
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            <form>
        `;
  }
}
