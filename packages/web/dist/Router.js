"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Router = exports.routes = void 0;
const routes_json_1 = __importDefault(require("./routes.json"));
function deepEqual(x, y) {
    const tx = typeof x;
    const ty = typeof y;
    return x && y && tx === "object" && tx === ty
        ? Object.keys(x).length === Object.keys(y).length &&
            Object.keys(x).every((key) => deepEqual(x[key], y[key]))
        : x === y;
}
exports.routes = routes_json_1.default.map((route) => {
    return {
        path: route.urlPath,
        component: () => { var _a; return _a = route.filePath, Promise.resolve().then(() => __importStar(require(_a))); }
    };
});
class Router {
    constructor(routes) {
        this.routes = new Set(routes);
        this.matcher = new RouterMatcher(routes);
        this.match = null;
        this.view = null;
        this.action = null;
        this.loader = null;
    }
    reloadLoaderData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loaderData } = yield this.loadLoaderData({ view: this.view, action: this.action, loader: this.loader }, req, res, next);
            return {
                view: this.view,
                action: this.action,
                loader: this.loader,
                loaderData,
            };
        });
    }
    loadView(pathname, { req, res, next }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const match = this.matcher.match(pathname);
            if (deepEqual(match, this.match) || !(match === null || match === void 0 ? void 0 : match.route)) {
                return yield this.loadLoaderData(this, req, res, next);
            }
            this.match = match;
            const { view, action, loader, params } = yield this.loadComponent(match);
            if (((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.user) && view) {
                view.user = req.session.user;
            }
            const { loaderData } = yield this.loadLoaderData({ view, action, loader }, req, res, next);
            this.view = view;
            this.action = action;
            this.loader = loader;
            return {
                view: this.view,
                action: this.action,
                loader: this.loader,
                loaderData,
            };
        });
    }
    loadComponent(match) {
        return __awaiter(this, void 0, void 0, function* () {
            const { default: View, action, loader } = yield match.route.component();
            const params = this.getParams(match);
            const view = View ? new View(params) : null;
            return { view, action, loader, params };
        });
    }
    loadLoaderData({ view, loader, action }, req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (loader) {
                const params = (_a = view === null || view === void 0 ? void 0 : view.params) !== null && _a !== void 0 ? _a : {};
                const loaderData = yield loader({
                    params,
                    req,
                    res,
                    next,
                });
                if (view) {
                    view.loaderData = loaderData;
                }
                view ? (view.loaderData = loaderData) : null;
                return { view, loader, action, loaderData };
            }
            return { view, loader, action };
        });
    }
    addRoute(route) {
        this.routes.add(route);
    }
    getParams(match) {
        if (!match.result)
            return;
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    }
}
exports.Router = Router;
class RouterMatcher {
    pathToRegex(path) {
        const sanitizedPath = path
            .replace(/\//g, "\\/")
            .replace(/:\w+/g, "([^\\/]+)");
        return new RegExp(`^${sanitizedPath}$`);
    }
    constructor(routes) {
        this.routes = routes;
        this.regexCache = new Map();
    }
    match(pathname) {
        const potentialMatches = this.routes.map((route) => {
            let regex = this.regexCache.get(route.path);
            if (!regex) {
                regex = this.pathToRegex(route.path);
                this.regexCache.set(route.path, regex);
            }
            return {
                route: route,
                result: pathname.match(regex),
            };
        });
        let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);
        if (!match) {
            match = {
                route: RouterMatcher.NOT_FOUND_ROUTE,
                result: [pathname],
            };
        }
        return match;
    }
}
RouterMatcher.NOT_FOUND_ROUTE = {
    path: "/404",
    component: () => Promise.resolve().then(() => __importStar(require("./views/pages/Error404"))),
};
exports.default = new Router(exports.routes);
