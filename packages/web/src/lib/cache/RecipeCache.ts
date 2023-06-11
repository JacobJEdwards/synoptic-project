import BaseCache from "./BaseCache";
import type { Recipe, Comment } from "../types";

export class RecipeCache extends BaseCache<Recipe> {
    constructor(prefix = "recipe:") {
        super(prefix);
    }

    public async getRecipe(id: number): Promise<Recipe | null> {
        return await this.get(id.toString());
    }

    public async setRecipe(id: number, recipe: Recipe): Promise<void> {
        await this.set(id.toString(), recipe);
    }

    public async deleteRecipe(id: number): Promise<void> {
        await this.delete(id.toString());
    }

    public async hasRecipe(id: number): Promise<boolean> {
        return await this.has(id.toString());
    }

    public async addComment(id: number, comment: Comment): Promise<void> {
        const recipe = await this.getRecipe(id);
        if (recipe) {
            recipe.comments?.push(comment);
            await this.setRecipe(id, recipe);
        }
    }

    public async getAllRecipes(): Promise<Recipe[]> {
        return await this.getAll();
    }
}

export default new RecipeCache();
