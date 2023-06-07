"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.loader = void 0;
const AbstractPage_1 = __importDefault(require("./AbstractPage"));
const auth_service_js_1 = require("../services/auth.service.js");
const loader = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)
        return res.redirect("/");
});
exports.loader = loader;
const action = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.redirect("/login");
    const { email, password } = req.body;
    const data = yield (0, auth_service_js_1.login)(email, password);
    if ((data === null || data === void 0 ? void 0 : data.user) && (data === null || data === void 0 ? void 0 : data.jwt)) {
        req.session.user = data.user;
        req.session.jwt = data.jwt;
        res.redirect("/");
    }
    else {
        res.redirect("/login");
    }
});
exports.action = action;
class Login extends AbstractPage_1.default {
    constructor(params, title = "Login") {
        super(params, title);
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
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
            </section>
        `;
        });
    }
    clientScript() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.default = Login;
