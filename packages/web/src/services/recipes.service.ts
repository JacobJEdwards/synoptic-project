// Purpose: Service for recipes
import type { Recipe } from "@lib/types";

export const recipeCache = new Map<number, Recipe>();

/**
 * @description Get all recipes
 * @returns {Array} Array of recipes
 */
export async function getRecipes(): Promise<Recipe[]> {
    try {
        if (recipeCache.size > 0) {
            return Array.from(recipeCache.values());
        }

        const response = await fetch("http://localhost:3000/recipes");
        if (!response.ok) {
            return [];
        }

        const recipes = await response.json();
        recipes.forEach((recipe: Recipe) => {
            if (!recipe.id) {
                return;
            }
            if (recipeCache.has(recipe.id)) {
                return;
            }

            recipeCache.set(recipe.id, recipe);
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
        const recipe = recipeCache.get(id);

        if (recipe) {
            return recipe;
        }

        const response = await fetch(`http://localhost:3000/recipes/${id}`);

        if (!response.ok) {
            return null;
        }

        return await response.json();
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

        recipeCache.set(data.id, data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
