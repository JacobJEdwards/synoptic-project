import { AbstractPage as Page } from "@lib/components";
import type {
    ActionFunction,
    LoaderFunction,
    Params,
    Recipe as RecipeType,
    RecipeTags,
} from "@lib/types";
import { getRecipesByFilter, searchRecipes } from "@/services/recipes.service";
import RecipeCard from "@components/StatelessRecipeCard";

export const loader: LoaderFunction = async ({ queryParams }) => {
    console.log("QUERY PARAMS:", queryParams);
    console.log(queryParams.getAll("a"));
    console.log("QUERY PARAMS:", queryParams);
};

export const action: ActionFunction = async ({ req }) => {
    const filter = req.body.filter.toUpperCase() as RecipeTags;
    const searchQuery = req.body.search.toLowerCase() ?? "";

    let filteredReps = await getRecipesByFilter(filter);

    if (searchQuery) {
        filteredReps = await searchRecipes(filteredReps, searchQuery);
    }

    return filteredReps;
};

export default class Dashboard extends Page {
    constructor(params: Params, title = "Home") {
        super(params, title);
    }

    override async getHtml() {
        const filteredReps = this.actionData ?? [];

        const recipeHtml = filteredReps
            .map((recipe: RecipeType) => {
                return new RecipeCard(recipe).render();
            })
            .join("");

        console.log("USER?:", this.user);
        const view = `
    <section class="prose">
        <section class="box">
            <div class="float-right">
                <img class="placeholder-image" id="index-image" src="/views/images/placeholder.jpeg" alt="placeholder" />
            </div>
            <article class="float-left">
                <h2 id="slogan">RECIPES FOR THE WORLD BY THE WORLD</h2>
                <p>
                    From Asia, Europe, Africa, South America, we work hard to provide all sorts of recipes
                    that will make you feel right at home.
                </p>
            </article>
        </section>
        <section class="search-box">
            <h2 id="search-title">Find a Recipe</h2>
            <form action="/" method="POST">
                <select id="select" name="filter">
                    <option value="All">All</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Halal">Halal</option>
                    <option value="Kosher">Kosher</option>
                </select>
                <input id="search-bar" type="text" placeholder="search the website" name="search">
                <button id="search-button" type="submit">search</button>
            </form>
        </section>
        <div>
            ${this.actionData && this.actionData.length === 0
                ? "<h2>No Recipes Found</h2>"
                : this.actionData && this.actionData.length > 0
                    ? "<h2>Recipes Found</h2>"
                    : ""
            }
            ${recipeHtml}
        </div>
    </section>
        `;

        return view;
    }

    override async clientScript(): Promise<void> {
        return;
    }
}
