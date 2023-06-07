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
class Page {
    constructor(params, title = "App") {
        this.title = title;
        this.params = params;
        this.loaderData = null;
    }
    setTitle() {
        document.title = this.title;
    }
    serverRender() {
        return __awaiter(this, void 0, void 0, function* () {
            let view = yield this.getHtml();
            return view;
        });
    }
    clientRender() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clientScript();
        });
    }
}
exports.default = Page;
