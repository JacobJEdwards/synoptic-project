import Page from "./AbstractPage.js";

export default class About extends Page {
  constructor(params) {
    super(params);
    this.setTitle("About Us");
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
