import { ZodValidationPipe } from "@anatine/zod-nestjs";
import { Logger } from "@nestjs/common";
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
  CreateRecipeResponseDto,
  UpdateRecipeDto,
  RecipeDto,
  UpdateRecipeResponseDto,
} from "./dto/recipes.dto";
import { ApiTags, ApiCreatedResponse } from "@nestjs/swagger";

@Controller("recipes")
@ApiTags("recipes")
@UsePipes(ZodValidationPipe)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateRecipeResponseDto })
  create(@Body() createRecipeDto: RecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  @ApiCreatedResponse({ type: Array<RecipeDto> })
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(":id")
  @ApiCreatedResponse({ type: RecipeDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.recipesService.findOne(id);
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: UpdateRecipeResponseDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(":id")
  @ApiCreatedResponse({ type: RecipeDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.recipesService.remove(id);
  }

  @Post(":id/comments")
  addComment(
    @Param("id", ParseIntPipe) id: number,
    @Body() comment: { message: string; userId?: number; username?: string }
  ) {
    Logger.log(comment);
    return this.recipesService.addComment(id, comment);
  }
}
