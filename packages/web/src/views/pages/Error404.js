import Page from "./AbstractPage.js";

export default class Error404 extends Page {
    constructor(params) {
        super(params);
        this.setTitle("404 - Page Not Found");
    }

    async getHtml() {
        let view = `
            <h1>404 - Page Not Found</h1>
            <p>Sorry, but the page you were trying to view does not exist.</p>
        `;

        return view;
    }
}
