"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatelessComponent_js_1 = __importDefault(require("./StatelessComponent.js"));
class LoginButton extends StatelessComponent_js_1.default {
    constructor() {
        super();
    }
    render() {
        return `
            <button class="login-button">Login</button>
        `;
    }
}
exports.default = LoginButton;
