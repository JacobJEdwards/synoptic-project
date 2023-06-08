import { AbstractPage as Page } from "@lib/components"
import type { Params, ActionArgs, ActionFunction, LoaderArgs, LoaderFunction, User } from "@lib/types";
import Comment from "@components/StatelessComment";

import { getRecipe } from "@services/recipes.service";
import { createComment } from "@services/comments.service";


export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const { id } = params;
  const recipe = await getRecipe(id);
  return recipe;
};

export const action: ActionFunction = async ({ req, res }: ActionArgs) => {
  const { body } = req;
  const { comment, recipeId } = body;

  const user = req.session.user ? req.session.user as User : undefined;

  const response = await createComment(comment, recipeId, user);

  res.redirect(`/recipes/${recipeId}`);
  return response;
};

export default class Recipe extends Page {
  constructor(params: Params, title = "Recipe") {
    super(params, title);
  }

  async getHtml() {
    const recipe = this.loaderData;
    console.log("ACTION", this.actionData);

    if (!recipe) {
      return `<h1>Recipe not found</h1>`;
    }

    const commentsHtml = recipe?.comments
      .map((comment: any) => {
        return new Comment(comment).render();
      })
      .join("");

    this.title = recipe.title;

    return `
    <article class="prose lg:prose-xl">
            <h1>${recipe.title}</h1>
            <p>${recipe.description}</p>
            <p>${recipe.ingredients}</p>
            <p>${recipe.steps}</p>
            <p>${recipe.comments.length} comments</p>
            <div class="comments">
                ${commentsHtml}
            </div>
            <form class="comment-form" method="POST">
                <input type="text" name="comment" placeholder="Your comment" />
                <input type="hidden" name="recipeId" value="${recipe.id}" />
                <button type="submit">Add comment</button>
            </form>
            </article>
        `;
  }

  async clientScript() {
      return
  }
}
