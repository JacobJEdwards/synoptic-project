import { AbstractComponent as Component } from "@lib/components";

export default class RecipeCard extends Component {
    constructor(parentElement: HTMLElement) {
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
