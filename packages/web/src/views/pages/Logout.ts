import Page from "./AbstractPage";
import type { LoaderFunction, LoaderArgs } from "../../types/Loader"

export const loader: LoaderFunction = async ({ req, res, next }: LoaderArgs) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
        });
    }

    res.redirect("/");
};
