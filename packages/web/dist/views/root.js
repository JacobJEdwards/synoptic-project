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
exports.init = exports.navigateTo = void 0;
const Router_js_1 = __importDefault(require("./Router.js"));
const navigateTo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    history.pushState(null, null, url);
    yield Render();
});
exports.navigateTo = navigateTo;
function init() {
    const stylesheets = [];
    stylesheets.forEach((stylesheet) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = stylesheet;
        document.head.appendChild(link);
    });
}
exports.init = init;
const Render = () => __awaiter(void 0, void 0, void 0, function* () {
    const { view } = yield Router_js_1.default.loadView(location.pathname);
    yield view.clientRender();
});
window.addEventListener("load", init());
window.addEventListener("popstate", Render);
document.addEventListener("DOMContentLoaded", () => {
    Render();
});
