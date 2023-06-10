import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "src/prisma/prisma.service";
import {UpdateRecipeDto,} from "./dto/recipes.dto";
import type {Recipe} from "@prisma/client";

@Injectable()
export class RecipesService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createRecipeDto: any) {
        const recipe = await this.prisma.recipe.create({
            data: {
                ...createRecipeDto,
            },
        });

        return recipe;
    }

    async findAll() {
        const recipes = await this.prisma.recipe.findMany({
            include: {
                comments: true,
                user: true,
            },
        });

        if (!recipes || recipes.length === 0) {
            throw new NotFoundException({status: 404, error: "No recipes found"});
        }

        return recipes;
    }

    async findOne(id: number) {
        const recipe = await this.prisma.recipe.findUnique({
            where: {
                id,
            },
            include: {
                comments: true,
                user: true,
            },
        });

        if (!recipe) {
            throw new NotFoundException({status: 404, error: "Recipe not found"});
        }

        return recipe;
    }

    async update(id: number, updateRecipeDto: UpdateRecipeDto) {
        return `This action updates a #${id} recipe`;
    }

    async remove(id: number) {
        return this.prisma.recipe.delete({
            where: {
                id,
            },
        });
    }

    async addComment(
        recipeId: number,
        comment: { message: string; userId?: number; username?: string }
    ): Promise<Recipe> {
        const response = await this.prisma.recipe.update({
            where: {
                id: recipeId,
            },
            data: {
                comments: {
                    create: {
                        ...comment,
                    },
                },
            },
        });
        return response;
    }
}
