import type { Recipe } from "../recipes.schema";

export type CreateRecipeDto = Omit<Recipe, "id">;
