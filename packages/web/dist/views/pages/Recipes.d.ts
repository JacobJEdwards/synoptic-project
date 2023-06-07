import Page from "./AbstractPage";
import type { LoaderFunction } from "../../types/Loader";
export declare const loader: LoaderFunction;
export default class Recipes extends Page {
    constructor(params: any, title?: string);
    getHtml(): Promise<string>;
    clientScript(): Promise<void>;
}
//# sourceMappingURL=Recipes.d.ts.map