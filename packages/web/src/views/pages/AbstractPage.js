/**
 * Abstract class for all pages
 */
export default class {
  /**
   * Constructor
   * @param {Object} params url parameters
   * @param {Function} loader data loader function
   */
  constructor(params, loader) {
    this.params = params;
    this.loader = loader;
    this.loaderData = null;
  }

  /**
   * Gets the data from the loader function
   * @returns {Object} data from the loader function
   */
  async init() {
    if (this.loader) {
      try {
        this.loaderData = await this.loader(this.params);
      } catch (e) {
        console.log(e);
      }
    }
  }

  /**
   * Sets the title of the page
   * @param {String} title title of the page
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   * Gets the html of the page
   * @returns {String} html of the page
   */
  async getHtml() {
    return "";
  }

  /**
   * Renders the page
   * @returns {String} html of the page
   */
  async render() {
    let view = await this.getHtml();
    return view;
  }

  /**
   * What to do after the page is rendered
   */
  async afterRender() {
    return;
  }
}
