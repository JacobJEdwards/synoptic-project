import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
import type { Recipe } from "@prisma/client";

export const RecipeZ = extendApi(
  z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
    ingredients: z.array(z.string()),
    origin: z.string().optional(),
    steps: z.string(),
    vegan: z.boolean().optional(),
    vegetarian: z.boolean().optional(),
    halal: z.boolean().optional(),
    kosher: z.boolean().optional(),
    tags: z.array(z.string()),
    userId: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
  {
    title: "Recipe",
    description: "Recipe",
  }
);

export class RecipeDto extends createZodDto(RecipeZ) {}

export class UpdateRecipeDto extends createZodDto(
  RecipeZ.omit({ id: true, createdAt: true, updatedAt: true }).partial()
) {}

export const GetRecipesZ = extendApi(z.array(RecipeZ), {
  title: "GetRecipes",
  description: "GetRecipes",
});

export class GetRecipesDto extends createZodDto(GetRecipesZ) {}

export const GetRecipeZ = extendApi(RecipeZ, {
  title: "GetRecipe",
  description: "GetRecipe",
});

export class GetRecipeDto extends createZodDto(GetRecipeZ) {}

export const CreateRecipeZ = extendApi(
  RecipeZ.omit({ id: true, createdAt: true, updatedAt: true }),
  {
    title: "CreateRecipe",
    description: "CreateRecipe",
  }
);

export class CreateRecipeDto extends createZodDto(CreateRecipeZ) {}
