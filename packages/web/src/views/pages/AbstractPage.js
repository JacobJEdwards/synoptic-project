export default class {
  constructor(params, loader) {
    this.params = params;
    this.loader = loader;
    this.loaderData = null;
  }

  async init() {
    if (this.loader) {
        try {
            this.loaderData = await this.loader(this.params);
        } catch (e) {
            console.log(e);
        }
    }
  }

  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }

  async render() {
    let view = await this.getHtml();
    return view;
  }

  async afterRender() {
    return;
  }
}
