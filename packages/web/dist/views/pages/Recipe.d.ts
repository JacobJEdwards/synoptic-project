import AbstractPage from "./AbstractPage";
import type { LoaderFunction } from "../../types/Loader";
import type { ActionFunction } from "../../types/Action";
export declare const loader: LoaderFunction;
export declare const action: ActionFunction;
export default class Recipe extends AbstractPage {
    constructor(params: any, title?: string);
    getHtml(): Promise<string>;
    clientScript(): Promise<void>;
}
//# sourceMappingURL=Recipe.d.ts.map