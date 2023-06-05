import AbstractPage from "./AbstractPage.js";
import { getRecipe } from "../services/recipes.service.js";
import { createComment } from "../services/comments.service.js";
import Comment from "../components/StatelessComment.js";

const loader = async (params) => {
  const { id } = params;
  const recipe = await getRecipe(id);
  return recipe;
};

export default class Recipe extends AbstractPage {
  constructor(params, title = "Recipe") {
    super(params, loader, title);
  }

  async getHtml() {
    const recipe = this.loaderData;

    if (!recipe) {
      return `<h1>Recipe not found</h1>`;
    }

    const commentsHtml = recipe?.comments
      .map((comment) => {
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
            <form class="comment-form">
                <input type="text" name="comment" placeholder="Your comment" />
                <button type="submit">Add comment</button>
            </form>
            </article>
        `;
  }

  async clientScript() {
    const form = document.querySelector(".comment-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const comment = formData.get("comment");
      const recipeId = this.params.id;
      const response = await createComment(comment, recipeId);
      window.location.reload();
    });
  }
}
