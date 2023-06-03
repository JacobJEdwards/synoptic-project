import Page from "./AbstractPage.js";

export default class About extends Page {
    constructor(params) {
        super(params);
        this.setTitle("About Us");
    }

    async getHtml() {
        let view = `
      <h1>About Us Page</h1>
        `;

        return view;
    }
}
