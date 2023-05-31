import { PrismaClient, User, Recipe, Role, Charity } from "@prisma/client";

const db = new PrismaClient();

type UserToCreate = Omit<User, "id">;
type RecipeToCreate = Omit<Recipe, "id" | "userId" | "updatedAt" | "createdAt">;
type CharityToCreate = Omit<Charity, "id">;

async function createUser(user: UserToCreate) {
    return await db.user.create({ data: user });
}

async function createRecipe(recipe: RecipeToCreate) {
    return await db.recipe.create({
        data: recipe,
    });
}

async function createCharity(charity: CharityToCreate) {
    return await db.charity.create({
        data: charity,
    });
}

async function addUserToRecipe(userId: number, recipeId: number) {
    return await db.user.update({
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
        password: "password123",
        role: Role.USER,
    },
    {
        email: "jane@example.com",
        username: "jane_smith",
        name: "Jane Smith",
        password: "password456",
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
