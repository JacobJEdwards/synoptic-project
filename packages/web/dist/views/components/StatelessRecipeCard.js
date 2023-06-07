"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Link_js_1 = __importDefault(require("./Link.js"));
const StatelessComponent_js_1 = __importDefault(require("./StatelessComponent.js"));
class StatelessCharityCard extends StatelessComponent_js_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const recipe = this.props;
        if (!recipe)
            return "";
        const link = new Link_js_1.default({
            href: `/recipes/${recipe.id}`,
            text: "View Recipe",
        });
        return `
            <article class="services">
                <figure>
                    <img src="/views/images/placeholder.jpg" alt="${recipe.name}" />
                    <figcaption>
                        <h2>${recipe.title}</h2>
                        <p>${recipe.description}</p>
                        ${link.render()}
                    </figcaption>
                </figure>
                </article>
            `;
    }
}
exports.default = StatelessCharityCard;
