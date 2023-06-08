import { AbstractPage as Page } from "@lib/components";
import type {
  Params,
  LoaderArgs,
  LoaderFunction,
  User,
  Comment,
  Recipe,
} from "@lib/types";
import { getProfile } from "@services/user.service";

export const loader: LoaderFunction = async ({ req, res }: LoaderArgs) => {
  const jwt = req.session.jwt;
  const userId = req.session?.user?.id;

  if (!jwt || !userId) {
    res.redirect("/login");
    return;
  }

  const profile = await getProfile(jwt, userId);

  if (!profile) {
    res.redirect("/login");
    return;
  }

  return profile;
};

export default class Profile extends Page {
  constructor(params: Params, title = "Profile") {
    super(params, title);
  }

  async getHtml(): Promise<string> {
    const user = this.loaderData as User;
    const comments = this.loaderData?.comments as Comment[];
    const recipes = this.loaderData?.recipes as Recipe[];

    return `
            <div class="container">
                <h1>Profile</h1>
                <a href="/logout">Logout</a>
            </div>
        `;
  }

  async clientScript(): Promise<void> {
    return;
  }
}
