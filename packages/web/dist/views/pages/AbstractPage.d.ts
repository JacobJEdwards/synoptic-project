export default abstract class Page {
    title: string;
    params: any;
    loaderData: any;
    actionData: any;
    user: any;
    constructor(params: any, title?: string);
    setTitle(): void;
    abstract getHtml(): Promise<string>;
    abstract clientScript(): Promise<void>;
    serverRender(): Promise<string>;
    clientRender(): Promise<void>;
}
//# sourceMappingURL=AbstractPage.d.ts.map