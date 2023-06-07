import Page from "./AbstractPage";
import type { LoaderFunction } from '../../types/Loader';
import type { ActionFunction } from '../../types/Action';
export declare const loader: LoaderFunction;
export declare const action: ActionFunction;
export default class Register extends Page {
    constructor(params: any, title?: string);
    getHtml(): Promise<string>;
    clientScript(): Promise<void>;
}
//# sourceMappingURL=Register.d.ts.map