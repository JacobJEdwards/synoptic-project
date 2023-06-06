export const loader = async ({ req, res, next }) => {
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
