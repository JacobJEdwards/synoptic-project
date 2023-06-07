type TemplateCache = Map<string, string[] | string>;
type AST = string[];
export type Data = Record<string, any>;
type Template = string;
export declare class Templater {
    regex: RegExp;
    keyRegex: RegExp;
    templateCache: TemplateCache;
    constructor();
    parse(template: Template): Promise<AST>;
    parseTemplateRegex(template: Template): Promise<string[]>;
    parseTemplate(template: Template): Promise<AST>;
    compileToString(template: Template, data: Data): Promise<string>;
    compileToStringDSA(template: Template, data: Data): Promise<string>;
    compileFileToString(path: string, data: Data, staticFile?: boolean): Promise<string>;
}
declare const _default: Templater;
export default _default;
//# sourceMappingURL=Templater.d.ts.map