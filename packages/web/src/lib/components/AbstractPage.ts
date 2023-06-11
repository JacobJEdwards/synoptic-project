import type {
  ActionReturn,
  LoaderReturn,
  MetaReturn,
  LinksReturn,
  Params,
  User,
} from "@lib/types";

/**
 * Abstract class for all pages
 */
export default abstract class Page {
  title: string;
  params: Params;
  queryParams!: URLSearchParams;
  loaderData: LoaderReturn<any> | null;
  actionData: ActionReturn<any> | null;
  meta: MetaReturn | null;
  links: LinksReturn | null;
  user: User | null;

  /**
   * Constructor
   * @param {Object} params url parameters
   * @param title
   */
  protected constructor(params: Params, title = "App") {
    this.title = title;
    this.params = params;
    this.loaderData = null;
    this.actionData = null;
    this.user = null;
    this.meta = null;
    this.links = null;
  }

  /**
   * Sets the title of the page
   */
  protected setTitle() {
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
  public async serverRender(): Promise<string> {
    const view = await this.getHtml();
    return view;
  }

  /**
   * What to do after the page is rendered
   */
  public async clientRender() {
    await this.clientScript();
  }
}
