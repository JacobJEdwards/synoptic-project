/*
model Recipe {
    id          Int      @id @default(autoincrement())
    title       String
    description String?
    ingredients String[]
    origin      String   @default("Unknown")
    steps       String
    vegan       Boolean  @default(false)
    vegetarian  Boolean  @default(false)
    halal       Boolean  @default(false)
    kosher      Boolean  @default(false)
    tags        String[]
    user        User?    @relation(fields: [userId], references: [id])
    userId      Int?
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}
*/

import type { Request, Response } from "express";
import AbstractPage from "./AbstractPage";
import { createRecipe } from "../services/recipes.service.js";
import type { ActionArgs, ActionFunction } from "../../types/Action";

export const action: ActionFunction = async ({ req, res }: ActionArgs) => {
    if (!req.body) return res.redirect("/recipes/create");

    const body = req.body;

    const { title, description, origin, steps } = body;

    const ingredients = body.ingredients.split("\n");
    const vegan = body.vegan === "on";
    const vegetarian = body.vegetarian === "on";
    const halal = body.halal === "on";
    const kosher = body.kosher === "on";
    const tags = body.tags.split("\n");

    const userId = req?.session?.user?.id;

    const recipe = {
        title,
        description,
        ingredients,
        origin,
        steps,
        vegan,
        vegetarian,
        halal,
        kosher,
        tags,
        userId,
    };

    const newRecipe = await createRecipe(recipe);

    if (!newRecipe) {
        return;
    }

    res.redirect(`/recipes/${newRecipe.id}`);
};

export default class CreateRecipe extends AbstractPage {
    constructor(params: any, title = "Create Recipe") {
        super(params, title);
    }

    async getHtml() {
        return `
        <section class="prose">
            <h1>Create Recipe</h1>
            <p class="form">required information is marked with an asterisk (*)</p>
            <form id="create-recipe-form" method="POST">
                <fieldset>
                    <legend>Create Recipe</legend>

                    <label class="label" for="title">Title*</label>
                    <input type="text" id="title" name="title" placeholder="Enter title" />

                    <label class="label" for="description">Description*</label>
                    <textarea id="description" name="description" placeholder="Enter description"></textarea>

                    <label class="label" for="ingredients">Ingredients*</label>
                    <textarea id="ingredients" name="ingredients" placeholder="Enter ingredients"></textarea>

                    <label class="label" for="origin">Origin*</label>
                    <input type="text" id="origin" name="origin" placeholder="Enter origin" />

                    <label class="label" for="steps">Steps*</label>
                    <textarea id="steps" name="steps" placeholder="Enter steps"></textarea>

                    <label class="label" for="tags">Tags</label>
                    <textarea id="tags" name="tags" placeholder="Enter tags"></textarea>

                    <label class="label">Meal Tags:</label>
                    <div class="checkbox">
                        <label for="vegan">Vegan</label>
                        <input type="checkbox" name="vegan" id="vegan">
                    </div>
                    <div class="checkbox"
                        <label for="vegetarian">Vegetarian</label>
                        <input type="checkbox" name="vegetarian" id="vegetarian">
                    </div>
                    <div class="checkbox">
                        <label for="Halal">Halal</label>
                        <input type="checkbox" name="Halal" id="Halal">
                    </div>
                    <div class="checkbox">
                        <label for="Kosher">Kosher</label>
                        <input type="checkbox" name="Kosher" id="Kosher">
                    </div>

                    <button id="create-button" type="submit">Create</button>
                </fieldset>
            </form>
        </section>
        `;
    }

    async clientScript() {
        // const form = document.getElementById("create-recipe-form");
        // form.addEventListener("submit", async (e) => {
        //   e.preventDefault();
        //   const formData = new FormData(form);
        //   const title = formData.get("title");
        //   const description = formData.get("description");
        //   const ingredients = formData.get("ingredients").split("\n");
        //   const origin = formData.get("origin");
        //   const steps = formData.get("steps");
        //   const vegan = formData.get("vegan") === "on";
        //   const vegetarian = formData.get("vegetarian") === "on";
        //   const halal = formData.get("halal") === "on";
        //   const kosher = formData.get("kosher") === "on";
        //   const tags = formData.get("tags").split("\n");
        //   const recipe = {
        //     title,
        //     description,
        //     ingredients,
        //     origin,
        //     steps,
        //     vegan,
        //     vegetarian,
        //     halal,
        //     kosher,
        //     tags,
        //   };
        //   const newRecipe = await createRecipe(recipe);
        // const { navigateTo } = await import("../../root.js");
        // await navigateTo(`/recipes/${newRecipe.id}`);
        // window.location.reload();
        return
    };
}
}
