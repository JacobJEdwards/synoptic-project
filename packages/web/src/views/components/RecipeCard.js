import Component from "./AbstractComponent.js";
import Link from "./Link.js";

export default class RecipeCard extends Component {
    constructor(parentElement, recipe) {
        super(parentElement, recipe);
        // this.props = recipe;
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
