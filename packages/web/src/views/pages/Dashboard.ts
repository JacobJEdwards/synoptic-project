import { AbstractPage as Page } from "@lib/components";
import type { LoaderFunction, Params } from "@lib/types";

export const loader: LoaderFunction = async ({ queryParams }) => {
    console.log("QUERY PARAMS:", queryParams);
};

export default class Dashboard extends Page {
    constructor(params: Params, title = "Home") {
        super(params, title);
    }

    async getHtml() {
        console.log("USER?:", this.user);
        const view = `
    <section class="prose">
        <section class="box">
            <div class="float-right">
                <img id="index-image" src="/views/images/index-image.jpeg" alt="placeholder" />
            </div>
            <article class="float-left">
            <h2 id="slogan">RECIPES FOR THE WORLD BY THE WORLD</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </p>
            </article>
        </section>
        <section class="search-box">
            <form action="">
                <input id="search-bar" type="text" placeholder="search the website" name="a">
                <button id="search-button" type="submit">search</button>
            </form>
        </section>
    </section>
        `;

        return view;
    }

    async clientScript(): Promise<void> {
        return;
    }
}
