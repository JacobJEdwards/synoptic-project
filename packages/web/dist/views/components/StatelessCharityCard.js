"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatelessComponent_js_1 = __importDefault(require("./StatelessComponent.js"));
class StatelessCharityCard extends StatelessComponent_js_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const charity = this.props;
        if (!charity)
            return "";
        return `
            <section class="charity-card">
            <h2>${charity.name}</h2>
            <p>
                <a href="${charity.website}" target="_blank" rel="noopener noreferrer">View Website</a>
            </p>
            </section>
            `;
    }
}
exports.default = StatelessCharityCard;
