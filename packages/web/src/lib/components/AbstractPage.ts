import type {
    ActionReturn,
    LoaderReturn,
    MetaReturn,
    LinksReturn,
    ScriptsReturn,
    Params,
    User,
} from "@lib/types";
import { TemplaterInstance, type Templater } from "../app";

/**
 * Abstract class for all pages
 */
export default class Page {
    title: string;
    params: Params;
    queryParams!: URLSearchParams;
    loaderData: LoaderReturn<any> | null;
    actionData: ActionReturn<any> | null;
    meta: MetaReturn | null;
    links: LinksReturn | null;
    scripts: ScriptsReturn | null;
    user: User | null;
    templater: Templater = TemplaterInstance;

    /**
     * Constructor
     * @param {Object} params url parameters
     * @param title
     */
    constructor(
        params: Params,
        title = "App"
    ) {
        this.title = title;
        this.params = params;
        this.loaderData = null;
        this.actionData = null;
        this.user = null;
        this.meta = null;
        this.links = null;
        this.scripts = null;
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
     async getHtml(): Promise<string> {
        return "";
     }

    /**
     * Run any client side scripts
     * @abstract
     */
    async clientScript(): Promise<void> {
        return;
    }

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
