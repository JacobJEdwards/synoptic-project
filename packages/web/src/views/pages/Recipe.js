import AbstractPage from "./AbstractPage.js";
import { getRecipe } from "../services/recipes.service.js";

const loader = async (params) => {
  console.log(params);
  const { id } = params;
  const recipe = await getRecipe(id);
  return recipe;
};

export default class Recipe extends AbstractPage {
  constructor(params, title = "Recipe") {
    super(params, loader, title);
  }

  async getHtml() {
    const recipe = this.loaderData;

    return `
    <article class="prose lg:prose-xl">
            <h1>${recipe.title}</h1>
            <p>${recipe.description}</p>
            <p>${recipe.ingredients}</p>
            <p>${recipe.steps}</p>
            </article>
        `;
  }
  async clientScript() {
    const recipe = this.loaderData;
    document.title = recipe.title;
  }
}
