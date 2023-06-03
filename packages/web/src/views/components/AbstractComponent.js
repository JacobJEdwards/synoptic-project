export default class AbstractComponent {
  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.props = props;
  }

  init() {
    new Promise((resolve, reject) => {
      resolve(this.render());
    });
  }

  async getHtml() {
    return "";
  }

  async getTemplate() {
    const view = await this.getHtml();
    const template = document.createElement("template");
    template.innerHTML = view;
    return template;
  }

  async render() {
    const template = await this.getTemplate();
    this.parentElement.appendChild(template.content.cloneNode(true));
    await this.afterRender();
  }

  async afterRender() {
    return;
  }
}
