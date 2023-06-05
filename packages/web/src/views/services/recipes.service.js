// Purpose: Service for recipes

/**
 * @description Get all recipes 
 * @returns {Array} Array of recipes 
 */
export async function getRecipes() {
  try {
    const recipes = await fetch("http://localhost:3000/recipes");
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
export async function getRecipe(id) {
  try {
    const recipe = await fetch(`http://localhost:3000/recipes/${id}`);
    return await recipe.json();
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function createRecipe(recipe) {
  try {
    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
      },
    });
      console.log(response);
    return await response.json();
  } catch (error) {
    console.log(error);
    return {};
  }
}
