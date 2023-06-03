import AbstractPage from "./AbstractPage.js";
import { getRecipe } from "../services/recipes.service.js";

const loader = async (params) => {
  const { id } = params;
  const recipe = await getRecipe(id);
  return recipe;
};

export default class Recipe extends AbstractPage {
  constructor(params, title) {
    super(params);
    this.setTitle(title || "Recipe");
  }

  async getHtml() {
    const recipe = await loader(this.params);
    console.log(recipe);
    return `
            <h1>${recipe.title}</h1>
            <p>${recipe.description}</p>
            <p>${recipe.ingredients}</p>
            <p>${recipe.steps}</p>
        `;
  }
}
