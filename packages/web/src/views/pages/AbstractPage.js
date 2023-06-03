export default class {
  constructor(params) {
    this.params = params;
    console.log(this.params);
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
