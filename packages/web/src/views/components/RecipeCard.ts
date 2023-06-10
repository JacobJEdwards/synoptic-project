import {AbstractComponent as Component} from "@lib/components";
import type {Recipe} from "@lib/types";
import Link from "./Link";

export default class RecipeCard extends Component {
    constructor(parentElement: HTMLElement, recipe: Recipe) {
        super(parentElement, recipe);
    }

    async getHtml() {
        const recipe = this.props;

        const link = new Link({
            href: `/recipes/${recipe.id}`,
            text: "View Recipe",
        });

        return `
                <figure>
                    <img src="/views/images/placeholder.jpg" alt="${recipe.name
        }" />
                    <figcaption>
                        <h2>${recipe.title}</h2>
                        <p>${recipe.description}</p>
                        ${link.render()}
                    </figcaption>
                </figure>
            `;
    }
}
