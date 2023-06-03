export async function getRecipes() {
  try {
    const recipes = await fetch("http://localhost:3000/recipes");
    return await recipes.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getRecipe(id) {
  try {
    const recipe = await fetch(`http://localhost:3000/recipes/${id}`);
    return await recipe.json();
  } catch (error) {
    console.log(error);
    return {};
  }
}
