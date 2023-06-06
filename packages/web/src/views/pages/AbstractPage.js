/**
 * Abstract class for all pages
 */
export default class {
  /**
   * Constructor
   * @param {Object} params url parameters
   * @param {Function} loader data loader function
   */
  constructor(params, title = "App") {
    this.title = title;
    this.params = params;
    this.loaderData = null;
  }

  /**
   * Sets the title of the page
   * @param {String} title title of the page
   */
  setTitle() {
    document.title = this.title;
  }

  /**
   * Gets the html of the page
   * @abstract
   * @returns {String} html of the page
   */
  async getHtml() {
    return "";
  }

  /**
   * Run any client side scripts
   * @abstract
   */
  async clientScript() {
    return;
  }

  /**
   * Renders the page
   * @returns {String} html of the page
   */
  async serverRender() {
    let view = await this.getHtml();
    return view;
  }

  /**
   * What to do after the page is rendered
   */
  async clientRender() {
    await this.clientScript();
    return;
  }
}
