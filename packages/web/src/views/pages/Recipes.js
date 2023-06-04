import Page from "./AbstractPage.js";
import { getRecipes } from "../services/recipes.service.js";
import RecipeCard from "../components/RecipeCard.js";
import Link from "../components/Link.js";

const loader = async () => {
  const recipes = await getRecipes();
  return recipes;
};

export default class Recipes extends Page {
  constructor(params, title = "Recipes") {
    super(params, loader, title);
  }

  async getHtml() {
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
      </section>
      ${new Link({
        href: "/recipes/new",
        text: "Add a Recipe",
      }).render()}
    </section>
        `;

    return view;
  }

  async clientScript() {
    const recipes = this.loaderData;
    if (!recipes) return;

    const recipeContainer = document.querySelector(".recipe-container");

    recipes.forEach((recipe) => {
      const recipeElement = document.createElement("article");
      recipeElement.classList.add("service");

      const recipeComponent = new RecipeCard(recipeElement, recipe);
      recipeComponent.init();

      recipeContainer.appendChild(recipeElement);
    });
  }
}
