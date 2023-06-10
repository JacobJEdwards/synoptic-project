import { AbstractPage as Page } from "@/lib/components";
import type { LoaderFunction, Params, Recipe } from "@lib/types";

import { getRecipes } from "@services/recipes.service";
import RecipeCard from "@components/StatelessRecipeCard";

export const loader: LoaderFunction<Recipe[]> = async () => {
    const response = await getRecipes();
    if (!response) {
        return {
            success: false,
            error: "No recipes found",
        };
    }

    return {
        success: true,
        data: response,
    };
};

export default class Recipes extends Page {
    constructor(params: Params, title = "Recipes") {
        super(params, title);
    }

    async getHtml() {
        const recipes = this.loaderData?.data as Recipe[];
        let recipesHtml = "";

        if (recipes) {
            recipesHtml = recipes
                .map((recipe: Recipe) => {
                    return new RecipeCard(recipe).render();
                })
                .join("");
        }
        let view = `
        <section class="prose">
      <h1>Recipes Page</h1>

      <h2>What do we provide?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <section>
        <article class="service">
          <h2>Our Favourite recipes</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>
        <article class="service">
          <h2>Want to show off your recipe?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>
      </section>
      <section class="recipe-container">
        ${recipesHtml}
      </section>
      <p id="add-recipe">Do you have a recipe that you can't find here, please
        <a href="/recipes/new">add it here</a>
      </p>
    </section>
        `;

        return view;
    }

    async clientScript() {
        return;
    }
}
