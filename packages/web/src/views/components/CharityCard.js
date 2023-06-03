import Component from "./AbstractComponent.js";

export default class RecipeCard extends Component {
    constructor(parentElement, charity) {
        super(parentElement, charity);
    }

    async getHtml() {
        const charity = this.props;

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
