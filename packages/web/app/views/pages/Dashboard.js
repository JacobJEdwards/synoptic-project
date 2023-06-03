import Page from "./AbstractPage.js";

export default class Dashboard extends Page {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        let view = `
    <section class="top">
        <article>
            <figure>
                <img class="topimg" src="images/placeholder.jpg" alt="placeholder" />
            </figure>
        </article>
    </section>
    <main>
        <h1>Index Page</h1>
        <h2>A world of Recipes</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        </p>
    </main>
        `;

        return view;
    }
}
