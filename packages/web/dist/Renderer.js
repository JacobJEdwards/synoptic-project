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
exports.Renderer = void 0;
const Templater_1 = require("./Templater");
const Router_1 = require("./Router");
const path_1 = __importDefault(require("path"));
class Renderer {
    constructor() {
        this.router = new Router_1.Router(Router_1.routes);
        this.templater = new Templater_1.Templater();
        this.filePath = path_1.default.resolve("src/views/index.html");
        this.pathname = null;
        this.view = null;
        this.action = null;
        this.loader = null;
    }
    render(pathname, { req, res, next }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { view, action, loader } = yield this.router.loadView(pathname, {
                req,
                res,
                next,
            });
            this.pathname = pathname;
            this.view = view;
            this.action = action;
            this.loader = loader;
            if (this.view) {
                return yield this.generateHtml(this.view);
            }
            return null;
        });
    }
    getComponent(pathname, { req, res, next }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pathname === pathname) {
                return { view: this.view, action: this.action, loader: this.loader };
            }
            this.pathname = pathname;
            const { view, action, loader } = yield this.router.loadView(this.pathname, {
                req,
                res,
                next,
            });
            this.view = view;
            this.action = action;
            this.loader = loader;
            return { view, action, loader };
        });
    }
    generateHtml(view) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.content = yield view.serverRender();
            data.title = (_a = view.title) !== null && _a !== void 0 ? _a : "Recipe App";
            data.login = view.user
                ? `<a href="/logout">Logout</a>`
                : `<a href="/login">Login</a>`;
            const html = yield this.templater.compileFileToString(this.filePath, data);
            return html;
        });
    }
}
exports.Renderer = Renderer;
exports.default = new Renderer();
