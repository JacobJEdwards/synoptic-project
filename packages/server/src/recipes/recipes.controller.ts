import { ZodValidationPipe } from "@anatine/zod-nestjs";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
} from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import {
  RecipeDto,
  GetRecipeDto,
  GetRecipesDto,
  UpdateRecipeDto,
  CreateRecipeDto,
} from "./dto/recipes.dto";
import { ApiTags, ApiCreatedResponse } from "@nestjs/swagger";

@Controller("recipes")
@ApiTags("recipes")
@UsePipes(ZodValidationPipe)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiCreatedResponse({ type: RecipeDto })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  @ApiCreatedResponse({ type: [RecipeDto] })
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ type: RecipeDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.recipesService.findOne(id);
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: RecipeDto })
  update(@Param("id", ParseIntPipe) id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(":id")
  @ApiCreatedResponse({ type: RecipeDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.recipesService.remove(id);
  }
}
