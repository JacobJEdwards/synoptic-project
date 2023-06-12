import { AbstractPage as Page } from "@lib/components";
import type { ActionFunction, LoaderFunction, Params, Recipe } from "@lib/types";
import { getRecipesByFilter } from "@/services/recipes.service";

export const loader: LoaderFunction = async ({ queryParams }) => {
  console.log("QUERY PARAMS:", queryParams);
  console.log(queryParams.getAll("a"));
  console.log("QUERY PARAMS:", queryParams);
};

export const action: ActionFunction = async ({ req }) => {
    console.log(req.body);
    const filteredReps = await(getRecipesByFilter(req.body.filter))
    console.log(filteredReps);
    return filteredReps;
}


export default class Dashboard extends Page {
  constructor(params: Params, title = "Home") {
    super(params, title);
  }

  override async getHtml() {
    const filteredReps = this.actionData ?? []

    const recipeHtml = filteredReps.map((recipe: Recipe) => {
        return
        `
        <p>${recipe.title}</p>
        `
    }).join("")

    console.log("USER?:", this.user);
    const view = `
    <section class="prose">
        <section class="box">
            <div class="float-right">
                <img id="index-image" src="/views/images/index-image.jpeg" alt="placeholder" />
            </div>
            <article class="float-left">
            <h2 id="slogan">RECIPES FOR THE WORLD BY THE WORLD</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </p>
            </article>
        </section>
        <section class="search-box">
            <form action="/" method="POST">
                <select name="filter">
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Halal">Halal</option>
                    <option value="Kosher">Kosher</option>
                </select>
                <input id="search-bar" type="text" placeholder="search the website" name="a">
                <button id="search-button" type="submit">search</button>
            </form>
            ${recipeHtml}
        </section>
    </section>
        `;

    return view;
  }

  override async clientScript(): Promise<void> {
    return;
  }
}
