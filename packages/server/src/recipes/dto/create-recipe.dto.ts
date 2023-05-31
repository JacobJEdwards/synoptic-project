import type { Recipe } from "@prisma/client";

export type CreateRecipeDto = Omit<Recipe, "id">;
