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
exports.action = exports.loader = void 0;
const AbstractPage_1 = __importDefault(require("./AbstractPage"));
const recipes_service_js_1 = require("../services/recipes.service.js");
const comments_service_js_1 = require("../services/comments.service.js");
const StatelessComment_js_1 = __importDefault(require("../components/StatelessComment.js"));
const loader = ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = params;
    const recipe = yield (0, recipes_service_js_1.getRecipe)(id);
    return recipe;
});
exports.loader = loader;
const action = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { body } = req;
    const { comment, recipeId } = body;
    const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    const response = yield (0, comments_service_js_1.createComment)(comment, recipeId, userId);
    res.redirect(`/recipe/${recipeId}`);
    return response;
});
exports.action = action;
class Recipe extends AbstractPage_1.default {
    constructor(params, title = "Recipe") {
        super(params, title);
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = this.loaderData;
            console.log("ACTION", this.actionData);
            if (!recipe) {
                return `<h1>Recipe not found</h1>`;
            }
            const commentsHtml = recipe === null || recipe === void 0 ? void 0 : recipe.comments.map((comment) => {
                return new StatelessComment_js_1.default(comment).render();
            }).join("");
            this.title = recipe.title;
            return `
    <article class="prose lg:prose-xl">
            <h1>${recipe.title}</h1>
            <p>${recipe.description}</p>
            <p>${recipe.ingredients}</p>
            <p>${recipe.steps}</p>
            <p>${recipe.comments.length} comments</p>
            <div class="comments">
                ${commentsHtml}
            </div>
            <form class="comment-form" method="POST">
                <input type="text" name="comment" placeholder="Your comment" />
                <input type="hidden" name="recipeId" value="${recipe.id}" />
                <button type="submit">Add comment</button>
            </form>
            </article>
        `;
        });
    }
    clientScript() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.default = Recipe;
