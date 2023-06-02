async function getRecipes() {
  try {
    const recipes = await fetch("http://localhost:3000/recipes");
    return await recipes.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getRecipes;
