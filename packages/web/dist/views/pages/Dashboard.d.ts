import Page from "./AbstractPage";
export default class Dashboard extends Page {
    constructor(params: any, title?: string);
    getHtml(): Promise<string>;
    clientScript(): Promise<void>;
}
//# sourceMappingURL=Dashboard.d.ts.map