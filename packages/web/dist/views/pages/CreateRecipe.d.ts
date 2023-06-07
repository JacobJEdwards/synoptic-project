import AbstractPage from "./AbstractPage";
import type { ActionFunction } from "../../types/Action";
export declare const action: ActionFunction;
export default class CreateRecipe extends AbstractPage {
    constructor(params: any, title?: string);
    getHtml(): Promise<string>;
    clientScript(): Promise<void>;
}
//# sourceMappingURL=CreateRecipe.d.ts.map