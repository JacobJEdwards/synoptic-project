// Purpose: Service for recipes
import type {Recipe} from "@lib/types";

/**
 * @description Get all recipes
 * @returns {Array} Array of recipes
 */
export async function getRecipes(): Promise<Recipe[]> {
    try {
        const recipes = await fetch("http://localhost:3000/recipes");
        if (!recipes.ok) {
            return [];
        }
        return await recipes.json();
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
        const recipe = await fetch(`http://localhost:3000/recipes/${id}`);

        if (!recipe.ok) {
            return null;
        }

        return await recipe.json();
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

        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}