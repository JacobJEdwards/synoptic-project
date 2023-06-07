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
exports.action = void 0;
const AbstractPage_1 = __importDefault(require("./AbstractPage"));
const recipes_service_js_1 = require("../services/recipes.service.js");
const action = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.body)
        return res.redirect("/recipes/create");
    const body = req.body;
    const { title, description, origin, steps } = body;
    const ingredients = body.ingredients.split("\n");
    const vegan = body.vegan === "on";
    const vegetarian = body.vegetarian === "on";
    const halal = body.halal === "on";
    const kosher = body.kosher === "on";
    const tags = body.tags.split("\n");
    const userId = (_b = (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    const recipe = {
        title,
        description,
        ingredients,
        origin,
        steps,
        vegan,
        vegetarian,
        halal,
        kosher,
        tags,
        userId,
    };
    const newRecipe = yield (0, recipes_service_js_1.createRecipe)(recipe);
    if (!newRecipe) {
        return;
    }
    res.redirect(`/recipes/${newRecipe.id}`);
});
exports.action = action;
class CreateRecipe extends AbstractPage_1.default {
    constructor(params, title = "Create Recipe") {
        super(params, title);
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            return `
        <section class="prose">
            <h1>Create Recipe</h1>
            <form id="create-recipe-form" method="POST">
                <div class="form-control">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter title" />
                </div>
                <div class="form-control">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" placeholder="Enter description"></textarea>
                </div>
                <div class="form-control">
                    <label for="ingredients">Ingredients</label>
                    <textarea id="ingredients" name="ingredients" placeholder="Enter ingredients"></textarea>
                </div>
                <div class="form-control">
                    <label for="origin">Origin</label>
                    <input type="text" id="origin" name="origin" placeholder="Enter origin" />
                </div>
                <div class="form-control">
                    <label for="steps">Steps</label>
                    <textarea id="steps" name="steps" placeholder="Enter steps"></textarea>
                </div>
                <div class="form-control">
                    <label for="vegan">Vegan</label>
                    <input type="checkbox" id="vegan" name="vegan" />
                </div>
                <div class="form-control">
                    <label for="vegetarian">Vegetarian</label>
                    <input type="checkbox" id="vegetarian" name="vegetarian" />
                </div>
                <div class="form-control">
                    <label for="halal">Halal</label>
                    <input type="checkbox" id="halal" name="halal" />
                </div>
                <div class="form-control">
                    <label for="kosher">Kosher</label>
                    <input type="checkbox" id="kosher" name="kosher" />
                </div>
                <div class="form-control">
                    <label for="tags">Tags</label>
                    <textarea id="tags" name="tags" placeholder="Enter tags"></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </section>
        `;
        });
    }
    clientScript() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    ;
}
exports.default = CreateRecipe;
