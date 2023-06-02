import getRecipes from "./getRecipes.js";

const recipePage = async () => {
  const recipes = await getRecipes();
  const recipeContainer = document.querySelector(".recipe-container");

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("article");

    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
        `;
    recipeContainer.appendChild(recipeCard);
  });
};

await recipePage();
