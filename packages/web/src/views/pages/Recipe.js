import AbstractPage from "./AbstractPage.js";
import { getRecipe } from "../services/recipes.service.js";

const loader = async (params) => {
  console.log(params);
  const { id } = params;
  const recipe = await getRecipe(id);
  return recipe;
};

export default class Recipe extends AbstractPage {
  constructor(params) {
    super(params, loader);
    this.setTitle("Recipe");
  }

  async getHtml() {
    const recipe = this.loaderData;

    this.setTitle(recipe.title);
    return `
            <h1>${recipe.title}</h1>
            <p>${recipe.description}</p>
            <p>${recipe.ingredients}</p>
            <p>${recipe.steps}</p>
        `;
  }
}
