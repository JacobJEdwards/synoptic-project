import fs from "fs/promises";

/**
 * @class Templater
 * @description A class that parses a template string and compiles it to a string
 * String given in the form {{ key }} will be replaced with the value of the key in the data object
 */
export class Templater {
  constructor() {
    // Regex to match {{ key }} in a string
    this.regex = new RegExp(/{{(.*?)}}/g);
    this.keyRegex = new RegExp(/{{|}}/g);
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

    const ast = this.parseTemplate(template);
    this.templateCache.set(template, ast);

    return ast;
  }

  async parseTemplateRegex(template) {
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

  async parseTemplate(template) {
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

  // async *parseTemplate(template) {
  //     let result = this.regex.exec(template);
  //     let lastIndex = 0;
  //
  //     while (result) {
  //         const firstPos = result.index;
  //         if (firstPos !== lastIndex) {
  //             yield template.substring(lastIndex, firstPos);
  //         }
  //
  //         yield result[0];
  //         lastIndex = firstPos + result[0].length;
  //         result = this.regex.exec(template);
  //     }
  //
  //     if (lastIndex < template.length) {
  //         yield template.substring(lastIndex);
  //     }
  // }

  async compileToString(template, data) {
    const ast = await this.parse(template);
    const resultArr = [];
    ast.map((item) => {
      if (item.match(this.regex)) {
        const key = item.replace(this.keyRegex, "").trim();
        data[key] = data[key] || "";
        resultArr.push(data[key]);
      } else {
        resultArr.push(item);
      }
    });
    return resultArr.join("");
  }

  async compileToStringDSA(template, data) {
    const ast = await this.parse(template);
    const templateKeys = new Set(
      ast
        .filter((item) => item.match(this.regex))
        .map((item) => item.replace(this.keyRegex, "").trim())
    );
    const resultArr = ast.map((item) => {
      if (templateKeys.has(item)) {
        const key = item.replace(this.keyRegex, "").trim();
        return data.hasOwnProperty(key) ? data.get(key) : "";
      }
      return item;
    });

    return resultArr.join("");
  }

  async compileFileToString(path, data, staticFile = true) {
    let template;
    if (staticFile && this.templateCache.has(path)) {
      template = this.templateCache.get(path);
    } else {
      template = await fs.readFile(path, "utf-8");
      this.templateCache.set(path, template);
    }

    return await this.compileToString(template, data);
  }
}

export default new Templater();
