import Page from "./AbstractPage";
import type { ExpressObject } from "../../app";

export const loader = async ({ req, res, next }: ExpressObject) => {
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

// export default class Logout extends Page {
//     constructor(params, title = "Logout") {
//         super(params, title);
//     }
//
//     async getHtml() {
//         return `
//             <div class="container">
//                 <h1>Logging out...</h1>
//             </div>
//         `;
//     }
// }
