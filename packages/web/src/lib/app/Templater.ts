import fs from "fs/promises";

type TemplateCache = Map<string, string[]>;
type FileCache = Map<string, string>
type AST = string[];
export type TemplateData = Record<string, any>;
type Template = string;

/**
 * @class Templater
 * @description A class that parses a template string and compiles it to a string
 * String given in the form {{ key }} will be replaced with the value of the key in the data object
 */
export default class Templater<T extends TemplateData = TemplateData> {
    regex: RegExp;
    keyRegex: RegExp;
    templateCache: TemplateCache;
    fileCache: FileCache;

    constructor() {
        // Regex to match {{ key }} in a string
        this.regex = new RegExp(/{{(.*?)}}/g);
        this.keyRegex = new RegExp(/{{|}}/g);
        this.templateCache = new Map();
        this.fileCache = new Map();
    }

    /**
     * @method parse
     * @description Parses a template string and returns an array of strings and keys ({{ key }})
     * @param {Template} template - The template string to parse (e.g. "<h1>{{ title }}</h1>")
     * @returns {Promise<AST>} - An array of strings and keys (e.g. ["<h1>", "{{ title }}", "</h1>"])
     */
    async parse(template: Template): Promise<AST> {
        // if (this.templateCache.has(template)) {
        //   return this.templateCache.get(template);
        // }

        const templateFromCache = this.templateCache.get(template);

        if (templateFromCache) {
            return templateFromCache;
        }

        const ast = await this.parseTemplate(template);
        this.templateCache.set(template, ast);

        return ast;
    }

    async parseTemplateRegex(template: Template) {
        let result = this.regex.exec(template);
        const arr = [];
        let firstPos;

        while (result) {
            firstPos = result.index;
            if (firstPos !== 0) {
                arr.push(template.substring(0, firstPos));
                template = template.slice(firstPos);
            }

            arr.push(result[0]);
            template = template.slice(result[0].length);
            result = this.regex.exec(template);
        }

        if (template) arr.push(template);

        return arr;
    }

    async parseTemplate(template: Template): Promise<AST> {
        const arr = [];
        let startPos = 0;

        while (true) {
            const startMarker = template.indexOf("{{", startPos);
            if (startMarker === -1) {
                if (startPos < template.length) {
                    arr.push(template.substring(startPos));
                }
                break;
            }

            const endMarker = template.indexOf("}}", startMarker);
            if (endMarker === -1) {
                throw new Error("Invalid template: missing closing }}");
            }

            if (startMarker !== startPos) {
                arr.push(template.substring(startPos, startMarker));
            }

            arr.push(template.substring(startMarker, endMarker + 2));
            startPos = endMarker + 2;
        }

        return arr;
    }

    async* parseTemplateGenerator(template: Template): AsyncGenerator<string> {
        let result = this.regex.exec(template);
        let lastIndex = 0;

        while (result) {
            const firstPos = result.index;
            if (firstPos !== lastIndex) {
                yield template.substring(lastIndex, firstPos);
            }

            yield result[0];
            lastIndex = firstPos + result[0].length;
            result = this.regex.exec(template);
        }

        if (lastIndex < template.length) {
            yield template.substring(lastIndex);
        }
    }

    async compileToString(template: Template, data: T): Promise<string> {
        const ast = await this.parse(template);
        const resultArr: Array<string | undefined> = [];
        ast.map((item: string) => {
            if (item.match(this.regex)) {
                const key = item.replace(this.keyRegex, "").trim();
                const replacement = data[key] || "";
                resultArr.push(replacement);
            } else {
                resultArr.push(item);
            }
        });
        return resultArr.join("");
    }

    async compileToStringGenerator(template: Template, data: T): Promise<string> {
        const resultArr: Array<string | undefined> = [];

        for await (const item of this.parseTemplateGenerator(template)) {
            if (item.match(this.regex)) {
                const key = item.replace(this.keyRegex, "").trim();
                const replacement = data[key] || "";
                resultArr.push(replacement);
            } else {
                resultArr.push(item);
            }
        }
        return resultArr.join("");
    }

    async compileFileToString(path: string, data: T, staticFile = true) {
        let template = this.fileCache.get(path);

        if (staticFile && template && typeof template === "string") {
            return await this.compileToString(template, data);
        }

        template = await fs.readFile(path, "utf-8");
        this.fileCache.set(path, template);

        return await this.compileToString(template, data);
    }
}
