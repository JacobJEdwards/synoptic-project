import {createZodDto} from "@anatine/zod-nestjs";
import {extendApi} from "@anatine/zod-openapi";
import {z} from "zod";

export const CommentZ = extendApi(
    z.object({
        id: z.number().optional(),
        userId: z.number().optional(),
        recipeId: z.number(),
        message: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    }),
    {
        title: "Comment",
        description: "Comment",
    }
);

export class CommentDto extends createZodDto(CommentZ) {
}

export class UpdateCommentDto extends createZodDto(
    CommentZ.omit({createdAt: true, updatedAt: true}).partial()
) {
}

export const CreateCommentResponseZ = extendApi(
    CommentZ,
    {
        title: "CreateComment",
        description: "CreateComment",
    }
);

export class CreateCommentResponseDto extends createZodDto(CreateCommentResponseZ) {
}

export class UpdateCommentResponseDto extends createZodDto(CommentZ) {
}

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
        userId: z.number().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        comments: z.array(CommentZ).optional(),
    }),
    {
        title: "Recipe",
        description: "Recipe",
    }
);

export class RecipeDto extends createZodDto(RecipeZ) {
}

export class UpdateRecipeDto extends createZodDto(
    RecipeZ.omit({createdAt: true, updatedAt: true}).partial()
) {
}

export const CreateRecipeResponseZ = extendApi(
    RecipeZ,
    {
        title: "CreateRecipe",
        description: "CreateRecipe",
    }
);

export class CreateRecipeResponseDto extends createZodDto(CreateRecipeResponseZ) {
}

export class UpdateRecipeResponseDto extends createZodDto(RecipeZ) {
}

