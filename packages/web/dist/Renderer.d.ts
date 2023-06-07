import { Templater } from "./Templater";
import { Router } from "./Router";
import { ExpressObject } from "./app";
import Page from "./views/pages/AbstractPage";
import type { LoaderFunction } from "./types/Loader";
import type { ActionFunction } from "./types/Action";
export declare class Renderer {
    router: Router;
    templater: Templater;
    filePath: string;
    pathname: string | null;
    view: Page | null;
    action: LoaderFunction | null;
    loader: ActionFunction | null;
    constructor();
    render(pathname: string, { req, res, next }: ExpressObject): Promise<string | null>;
    getComponent(pathname: string, { req, res, next }: ExpressObject): Promise<{
        view: any;
        action: any;
        loader: any;
    }>;
    generateHtml(view: Page): Promise<string>;
}
declare const _default: Renderer;
export default _default;
//# sourceMappingURL=Renderer.d.ts.map