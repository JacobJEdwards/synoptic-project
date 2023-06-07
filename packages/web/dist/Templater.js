"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templater = void 0;
const promises_1 = __importDefault(require("fs/promises"));
class Templater {
    constructor() {
        this.regex = new RegExp(/{{(.*?)}}/g);
        this.keyRegex = new RegExp(/{{|}}/g);
        this.templateCache = new Map();
    }
    parse(template) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateFromCache = this.templateCache.get(template);
            if (templateFromCache && Array.isArray(templateFromCache)) {
                return templateFromCache;
            }
            const ast = yield this.parseTemplate(template);
            this.templateCache.set(template, ast);
            return ast;
        });
    }
    parseTemplateRegex(template) {
        return __awaiter(this, void 0, void 0, function* () {
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
            if (template)
                arr.push(template);
            return arr;
        });
    }
    parseTemplate(template) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    compileToString(template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ast = yield this.parse(template);
            const resultArr = [];
            ast.map((item) => {
                if (item.match(this.regex)) {
                    const key = item.replace(this.keyRegex, "").trim();
                    data[key] = data[key] || "";
                    resultArr.push(data[key]);
                }
                else {
                    resultArr.push(item);
                }
            });
            return resultArr.join("");
        });
    }
    compileToStringDSA(template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ast = yield this.parse(template);
            const templateKeys = new Set(ast
                .filter((item) => item.match(this.regex))
                .map((item) => item.replace(this.keyRegex, "").trim()));
            const resultArr = ast.map((item) => {
                if (templateKeys.has(item)) {
                    const key = item.replace(this.keyRegex, "").trim();
                    return data[key] || "";
                }
                return item;
            });
            return resultArr.join("");
        });
    }
    compileFileToString(path, data, staticFile = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let template = this.templateCache.get(path);
            if (staticFile && template && typeof template === "string") {
                return yield this.compileToString(template, data);
            }
            template = yield promises_1.default.readFile(path, "utf-8");
            this.templateCache.set(path, template);
            return yield this.compileToString(template, data);
        });
    }
}
exports.Templater = Templater;
exports.default = new Templater();
