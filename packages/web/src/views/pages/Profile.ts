import { AbstractPage as Page } from "@lib/components";
import type {
    Comment,
    LoaderArgs,
    LoaderFunction,
    Params,
    Recipe,
    User,
} from "@lib/types";
import { getProfile } from "@services/user.service";

export const loader: LoaderFunction<User> = async ({
    req,
    res,
}: LoaderArgs) => {
    const jwt = req.session?.jwt;
    console.log("jwt", jwt);

    if (!jwt) {
        res.redirect("/login");
        return;
    }

    const profile = await getProfile(jwt);

    if (!profile) {
        res.redirect("/login");
        return {
            success: false,
            error: "User not found",
        };
    }

    return {
        success: true,
        data: profile,
    };
};

export default class Profile extends Page {
    constructor(params: Params, title = "Profile") {
        super(params, title);
    }

    async getHtml(): Promise<string> {
        const user = this.loaderData?.data as User;
        const comments = this.loaderData?.data?.comments as Comment[];
        const recipes = this.loaderData?.data?.recipes as Recipe[];

        const recipesHtml = `<ul>${recipes
                ? recipes.map(
                    (recipe) =>
                        `<li>
                        <a href=/recipes/${recipe.id}>${recipe.title}</a>
                    </li>`
                )
                : ""
            }</ul>`;

        const commentsHtml = `<ul>${comments
                ? comments.map(
                    (comment) =>
                        `<li>
                        <p>${comment.message}</p>
                        <a href=/recipes/${comment.recipeId}>View Recipe</a>
                    </li>`
                )
                : ""
            }</ul>`.replace(/,/g, "");

        return `
            <div class="container">
                <h1>Profile</h1>
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>Comments: ${comments.length}</p>
                ${commentsHtml}
                <br />
                <br />
                <p>Recipes: ${recipes.length}</p>
                ${recipesHtml}
                <br />
                <br />
                <a href="/logout">Logout</a>
            </div>
        `;
    }

    async clientScript(): Promise<void> {
        return;
    }
}
