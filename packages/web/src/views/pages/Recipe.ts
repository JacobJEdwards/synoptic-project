import AbstractPage from "./AbstractPage";
import { getRecipe } from "../services/recipes.service.js";
import { createComment } from "../services/comments.service.js";
import Comment from "../components/StatelessComment.js";
import type { LoaderArgs, LoaderFunction } from "../../types/Loader";
import type { ActionArgs, ActionFunction } from "../../types/Action";


export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const { id } = params;
  const recipe = await getRecipe(id);
  return recipe;
};

export const action: ActionFunction = async ({ req, res }: ActionArgs) => {
  const { body } = req;
  const { comment, recipeId } = body;

  const userId = req?.session?.user?.id;

  const response = await createComment(comment, recipeId, userId);

  res.redirect(`/recipe/${recipeId}`);
  return response;
};

export default class Recipe extends AbstractPage {
  constructor(params: any, title = "Recipe") {
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
