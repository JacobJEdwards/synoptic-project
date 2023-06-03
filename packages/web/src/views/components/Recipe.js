import Component from "./AbstractComponent.js";

export default class Recipe extends Component {
  constructor(parentElement, recipe) {
    super(parentElement, recipe);
    // this.props = recipe;
  }

  async getHtml() {
    const recipe = this.props;
    return `
                <figure>
                    <img src="views/images/placeholder.jpg" alt="${recipe.name}" />
                    <figcaption>
                        <h2>${recipe.title}</h2>
                        <p>${recipe.description}</p>
                    </figcaption>
                </figure>
            `;
  }
}
