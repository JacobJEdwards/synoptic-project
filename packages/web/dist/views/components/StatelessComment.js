"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatelessComponent_js_1 = __importDefault(require("./StatelessComponent.js"));
class StatelessComment extends StatelessComponent_js_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const comment = this.props;
        return `
            <div class="comment">
                <p>${comment.message}</p>
            </div>
        `;
    }
}
exports.default = StatelessComment;
