// Purpose: Service for recipes
import type { Recipe } from "@lib/types";
import { RecipeCache } from '@lib/cache'

/**
 * @description Get all recipes
 * @returns {Array} Array of recipes
 */
export async function getRecipes(): Promise<Recipe[]> {
    try {
        const recipesList = await RecipeCache.getAll();

        if (recipesList.length > 0) {
            return recipesList;
        }

        const response = await fetch("http://localhost:3000/recipes");
        if (!response.ok) {
            return [];
        }

        const recipes = await response.json();
        recipes.forEach(async (recipe: Recipe) => {
            if (!recipe.id) {
                return;
            }

            if (await RecipeCache.hasRecipe(recipe.id)) {
                return;
            }

            await RecipeCache.setRecipe(recipe.id, recipe);
        });

        return recipes;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * @description Get a recipe by id
 * @param {Number} id Id of the recipe
 * @returns {Object} Recipe object
 */
export async function getRecipe(id: number): Promise<Recipe | null> {
    try {
        const recipe = await RecipeCache.getRecipe(id);

        if (recipe) {
            return recipe;
        }

        const response = await fetch(`http://localhost:3000/recipes/${id}`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json() as Recipe;

        await RecipeCache.setRecipe(id, data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createRecipe(recipe: Recipe): Promise<Recipe | null> {
    try {
        const response = await fetch("http://localhost:3000/recipes", {
            method: "POST",
            body: JSON.stringify(recipe),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        await RecipeCache.setRecipe(data.id, data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
