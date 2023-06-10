import { AbstractPage as Page } from "@lib/components";
import type {
  ActionArgs,
  ActionFunction,
  Comment,
  LoaderArgs,
  LoaderFunction,
  Params,
  Recipe as RecipeType,
  User,
} from "@lib/types";
import CommentComponent from "@components/StatelessComment";

import { getRecipe } from "@services/recipes.service";
import { createComment } from "@services/comments.service";

export const loader: LoaderFunction<RecipeType> = async ({
  params,
  res,
}: LoaderArgs) => {
  const id = parseInt(params.id as string);

  if (!id || typeof id !== "number") {
    res.redirect("/recipes");
    return {
      success: false,
      error: "Recipe not found",
    };
  }

  const data = await getRecipe(id);
  if (!data) {
    return {
      success: false,
      error: "Recipe not found",
    };
  }
  return {
    data: data,
    success: true,
  };
};

export const action: ActionFunction<Comment> = async ({
  req,
  res,
}: ActionArgs) => {
  const { body } = req;
  const { message, recipeId } = body;

  const user = req.session.user ? (req.session.user as User) : undefined;

  const response = await createComment(message, recipeId, user);

  if (!response) {
    return {
      success: false,
      error: "Error creating comment",
    };
  }

  res.redirect(`/recipes/${recipeId}`);

  return {
    success: true,
    data: response,
  };
};

export default class Recipe extends Page {
  constructor(params: Params, title = "Recipe") {
    super(params, title);
  }

  async getHtml() {
    console.log("ACTION", this.actionData);
    const recipe = this.loaderData?.data as RecipeType;

    if (!recipe) {
      return `<h1>Recipe not found</h1>`;
    }

    const commentsHtml = recipe.comments
      ? recipe.comments
          .map((comment: Comment) => {
            return new CommentComponent(comment).render();
          })
          .join("")
      : "";

    this.title = recipe.title;

    // css needs doing

    return `
    <article class="prose lg:prose-xl">
            <h1>${recipe.title}</h1>
            <p>${recipe.description}</p>
            <p>${recipe.ingredients}</p>
            <p>${recipe.steps}</p>
            ${recipe.User ? `<p>Created by ${recipe.User.username}</p>` : ""}
            <br />
            <br />
            <hr />
            <br />
            <br />
            <p>${recipe?.comments?.length} comment${
      recipe?.comments?.length === 1 ? "" : "s"
    }</p>
            <div class="comments">
                ${commentsHtml}
            </div>
            <h2>Add comment</h2>
            <form action="/recipes/${recipe.id}" method="POST">
                <input type="hidden" name="recipeId" value="${recipe.id}" />
                <div class="form-control">
                    <label class="label" for="message">Message</label>
                    <textarea class="textarea" name="message" id="message" cols="30" rows="10"></textarea>
                </div>
                <button class="btn" type="submit">Add comment</button>
            </form>
            </article>
        `;
  }

  async clientScript() {
    return;
  }
}
