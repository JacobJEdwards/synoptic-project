import type {LoaderArgs, LoaderFunction} from "@lib/types"

export const loader: LoaderFunction<void> = async ({req, res, next}: LoaderArgs) => {
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
