import Page from "./AbstractPage";

export default class About extends Page {
    constructor(params: any, title = "About Us") {
        super(params, title);
    }

    async getHtml() {
        let view = `
        <section class="prose">
      <h1 class="text-2xl">About Us Page</h1>
      </section>
        `;

        return view;
    }

    async clientScript(): Promise<void> {
        return;
    }
}
