/**
 * @class AbstractComponent
 * @description Abstract class for all components
 */
export default class AbstractComponent {
  /**
   * @constructor
   * @param {HTMLElement} parentElement element where the component will be rendered
   * @param {Object} props properties of the component
   */
  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.props = props;
  }

  /**
   * @method init
   * @description Initializes the component
   * @returns {Promise<void>}
   * @memberof AbstractComponent
   * @instance
   */
  init() {
    new Promise((resolve) => {
      resolve(this.render());
    });
  }

  /**
   * @method getHtml
   * @description Returns the HTML of the component
   */
  async getHtml() {
    return "";
  }

  /**
   * @method getTemplate
   * @description Returns the template of the component
   */
  async getTemplate() {
    const view = await this.getHtml();
    const template = document.createElement("template");
    template.innerHTML = view;
    return template;
  }

  /**
   * @method render
   * @description Renders the component in the DOM by appending the template to the parentElement
   * @memberof AbstractComponent
   * @instance
   * @returns {Promise<void>}
   */
  async render() {
    const template = await this.getTemplate();
    this.parentElement.appendChild(template.content.cloneNode(true));
    await this.afterRender();
  }

  /**
   * @method afterRender
   * @description Hook that is executed after the component is rendered
   */
  async afterRender() {
    return;
  }
}
