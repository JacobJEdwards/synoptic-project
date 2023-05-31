import { PrismaClient, User, Recipe, Role } from "@prisma/client";

const db = new PrismaClient();

type UserToCreate = Omit<User, "id">;
type RecipeToCreate = Omit<Recipe, "id" | "userId">;

async function createUser(user: UserToCreate) {
  return await db.user.create({ data: user });
}

async function createRecipe(recipe: RecipeToCreate) {
  return await db.recipe.create({
    data: recipe,
  });
}

// async function addUserToRecipe(userId: number, recipeId: number) {
//   return await db.user.update({
//     where: { id: userId },
//     data: {
//       recipes: {
//         connect: {
//           id: recipeId,
//         },
//       },
//     },
//   });
// }

const users: UserToCreate[] = [];

const recipes: RecipeToCreate[] = [
  {
    title: "Deep Fried Mars Bar",
    description: "A delicious treat from Scotland",
    ingredients: ["Mars Bar", "Batter", "Oil"],
    origin: "Scotland",
    steps: "Deep fry the mars bar",
    kosher: false,
    vegetarian: true,
    vegan: false,
    halal: false,
    tags: ["dessert", "scottish"],
  },
];

async function main() {
  const createdRecipes = await Promise.all(
    recipes.map((recipe) => createRecipe(recipe))
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
