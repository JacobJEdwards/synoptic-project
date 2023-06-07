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
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractComponent {
    constructor(parentElement, props) {
        this.parentElement = parentElement;
        this.props = props;
    }
    init() {
        new Promise((resolve) => {
            resolve(this.render());
        });
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            return "";
        });
    }
    getTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            const view = yield this.getHtml();
            const template = document.createElement("template");
            template.innerHTML = view;
            return template;
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.parentElement) {
                return yield this.getHtml();
            }
            const template = yield this.getTemplate();
            this.parentElement.appendChild(template.content.cloneNode(true));
            yield this.afterRender();
        });
    }
    afterRender() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.default = AbstractComponent;
