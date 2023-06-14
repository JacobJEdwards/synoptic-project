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

    override async getHtml() {
        const recipes = this.loaderData?.data as Recipe[];
        let recipesHtml = "";

        if (recipes) {
            recipesHtml = recipes
                .map((recipe: Recipe) => {
                    return new RecipeCard(recipe).render();
                })
                .join("");
        }
        const view = `
        <section class="prose">
      <h1>Recipes Page</h1>

      <h2>What do we provide?</h2>
      <p>
        From Asia to Europe, to Africa and South America, we provide all sorts of
        recipes from many cultures around the world.
      </p>

      <section>
        <article class="service">
          <h2>How it works</h2>
          <p>
            when you click on a recipe, it will show you a feature image of the dish, and simple
            easy-to-follow instructions. Each recipe also has its own diffculty
          
          </p>
        </article>
        <article class="service">
          <h2>Want to show off your recipe?</h2>
          <p>
            Do you have a recipe in mind that you want to share with others? We 
            encourage you to share it with us here. If you create a free account,
            you can post it on this website for free!
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

    override async clientScript() {
        return;
    }
}
