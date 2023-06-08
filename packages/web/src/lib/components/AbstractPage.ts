import type { Params, User } from "@lib/types";
/**
 * Abstract class for all pages
 */
export default abstract class Page {
  title: string;
  params: Params;
  loaderData: any;
  actionData: any;
  user: User | null;
  /**
   * Constructor
   * @param {Object} params url parameters
   */
  constructor(params: Params, title = "App") {
    this.title = title;
    this.params = params;
    this.loaderData = null;
    this.actionData = null;
    this.user = null;
  }

  /**
   * Sets the title of the page
   */
  setTitle() {
    document.title = this.title;
  }

  /**
   * Gets the html of the page
   * @abstract
   * @returns {String} html of the page
   */
  abstract getHtml(): Promise<string>;

  /**
   * Run any client side scripts
   * @abstract
   */
  abstract clientScript(): Promise<void>;

  /**
   * Renders the page
   * @returns {String} html of the page
   */
  async serverRender(): Promise<string> {
    let view = await this.getHtml();
    return view;
  }

  /**
   * What to do after the page is rendered
   */
  async clientRender() {
    await this.clientScript();
  }
}
