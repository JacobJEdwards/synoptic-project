import fs from "fs/promises";

/**
 * @class Templater
 * @description A class that parses a template string and compiles it to a string
 * String given in the form {{ key }} will be replaced with the value of the key in the data object
 */
class Templater {
    constructor() {
        // Regex to match {{ key }} in a string
        this.regex = new RegExp(/{{(.*?)}}/g);
        this.templateCache = new Map();
    }

    /**
     * @method parse
     * @description Parses a template string and returns an array of strings and keys ({{ key }})
     * @param {string} template - The template string to parse (e.g. "<h1>{{ title }}</h1>")
     * @returns {Promise<string[]>} - An array of strings and keys (e.g. ["<h1>", "{{ title }}", "</h1>"])
     */
    async parse(template) {
        if (this.templateCache.has(template)) {
            return this.templateCache.get(template);
        }

        const ast = await this.parseTemplate(template);
        console.log(ast)
        this.templateCache.set(template, ast);

        return ast;
    }

    async parseTemplate(template) {
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

    async compileToString(template, data) {
        const ast = await this.parse(template);
        const resultArr = [];
        ast.forEach((item) => {
            if (item.match(this.regex)) {
                const key = item.replace(/{{|}}/g, "").trim();
                data[key] = data[key] || "";
                resultArr.push(data[key]);
            } else {
                resultArr.push(item);
            }
        });
        return resultArr.join("");
    }

    async compileFileToString(path, data) {
        const template = await fs.readFile(path, "utf-8");
        return await this.compileToString(template, data);
    }
}

export default new Templater();
