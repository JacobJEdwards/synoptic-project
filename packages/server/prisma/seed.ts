import { Charity, PrismaClient, Recipe, Role, User } from "@prisma/client";

const db = new PrismaClient();

type UserToCreate = Omit<User, "id">;
type RecipeToCreate = Omit<Recipe, "id" | "userId" | "updatedAt" | "createdAt">;
type CharityToCreate = Omit<Charity, "id">;

async function createUser(user: UserToCreate) {
  return db.user.create({ data: user });
}

async function createRecipe(recipe: RecipeToCreate) {
  return db.recipe.create({
    data: recipe,
  });
}

async function createCharity(charity: CharityToCreate) {
  return db.charity.create({
    data: charity,
  });
}

async function addUserToRecipe(userId: number, recipeId: number) {
  return db.user.update({
    where: { id: userId },
    data: {
      recipes: {
        connect: {
          id: recipeId,
        },
      },
    },
  });
}

const users: UserToCreate[] = [
  {
    email: "john@example.com",
    username: "john_doe",
    name: "John Doe",
    password: "$2y$10$4YmTTAECyYG1q7rcWJZVLOYHocWN/eRUN0C18OfXeWucE80P9979.",
    role: Role.USER,
  },
  {
    email: "jane@example.com",
    username: "jane_smith",
    name: "Jane Smith",
    password: "$2y$10$4YmTTAECyYG1q7rcWJZVLOYHocWN/eRUN0C18OfXeWucE80P9979.",
    role: Role.USER,
  },
];

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
  {
    title: "Spaghetti Bolognese",
    description: "Classic Italian pasta dish",
    ingredients: [
      "Spaghetti",
      "Ground beef",
      "Tomato sauce",
      "Onion",
      "Garlic",
    ],
    origin: "Italy",
    steps:
      "1. Cook the spaghetti. 2. Brown the ground beef. 3. Add onion and garlic. 4. Mix in tomato sauce. 5. Serve over spaghetti.",
    kosher: false,
    vegetarian: false,
    vegan: false,
    halal: false,
    tags: ["pasta", "italian"],
  },
];

const charities: CharityToCreate[] = [
  {
    name: "Red Cross",
    description:
      "Humanitarian organization providing emergency assistance and disaster relief",
    website: "https://www.redcross.org",
  },
  {
    name: "World Wildlife Fund",
    description:
      "International conservation organization working to protect endangered species and ecosystems",
    website: "https://www.worldwildlife.org",
  },
  {
    name: "Get into Govan",
    description: `
    info about the charity: This group is made up of many organisations listed below, along with local community members. They are working together as a group to achieve better food outcomes in Govan. 
      Aberlour,  Elderpark Housing Association, Gilded Lily, Glasgow City Council Neighbourhoods & Sustainability (Growing Spaces), Glasgow City HSCP (Health Improvement),  Glasgow Community Food Network, Glasgow Housing Association, Glasgow Life, Go Vegan Govan, Govan Boxing Club, Govan Community Project, Govan HELP, Govan Housing Association, Govan Youth Information Point,  Moogety Foods, Preshal Trust, Propagate, The Riverside Hall, and Urban Roots.`,
    website: "https://getintogovan.com/thriving-places-food-for-good-group/",
  },
  {
      name: "Moogety Foods",
      description: "info about the charity: Moogety Foods is a non-profit social enterprise based in Govan, Glasgow, promoting healthy eating, cooking and participation within the community.",
      website: "https://elderpark.org/your-community/projects/moogety-foods-moogety-food-hub-moogety-garden/"
  },
  {
    name: "Govan Pantry",
    description: "info about the charity: The Govan Pantry is a subsidised community shop that helps families to shop smarter and budget better, providing access to food and other essential items at reduced cost.",
    website: "https://www.govanhelp.org/services/the-govan-pantry/",
  }
];

async function main() {
  const createdRecipes = await Promise.all(
    recipes.map((recipe) => createRecipe(recipe))
  );

  const createdUsers = await Promise.all(users.map((user) => createUser(user)));

  const createdCharities = await Promise.all(
    charities.map((charity) => createCharity(charity))
  );

  await addUserToRecipe(createdUsers[0].id, createdRecipes[0].id);
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
