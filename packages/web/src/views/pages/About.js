import Page from "./AbstractPage.js";

export default class About extends Page {
  constructor(params, title="About Us") {
    super(params, null, title);
  }

  async getHtml() {
    let view = `
        <section class="prose">
      <h1 class="text-2xl">About Us Page</h1>
      </section>
        `;

    return view;
  }
}
