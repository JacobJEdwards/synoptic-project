"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatelessComponent_js_1 = __importDefault(require("./StatelessComponent.js"));
class Link extends StatelessComponent_js_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const { href, text } = this.props;
        return `<a href="${href}" data-link>${text}</a>`;
    }
}
exports.default = Link;
