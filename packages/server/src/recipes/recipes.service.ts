import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    return "This action adds a new recipe";
  }

  async findAll() {
    const recipes = await this.prisma.recipe.findMany();

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
    return await this.prisma.recipe.delete({
      where: {
        id,
      },
    });
  }
}
