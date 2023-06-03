import Component from "./AbstractComponent.js";

export default class RecipeCard extends Component {
    constructor(parentElement) {
        super(parentElement);
    }

    async getHtml() {
        return `
            <footer>
                <p>Copyright ©2023 Worldwide Recipes</p>
            </footer>
            `;
    }
}
