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
exports.loader = void 0;
const AbstractPage_1 = __importDefault(require("./AbstractPage"));
const recipes_service_js_1 = require("../services/recipes.service.js");
const StatelessRecipeCard_js_1 = __importDefault(require("../components/StatelessRecipeCard.js"));
const Link_js_1 = __importDefault(require("../components/Link.js"));
const loader = () => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield (0, recipes_service_js_1.getRecipes)();
    return recipes;
});
exports.loader = loader;
class Recipes extends AbstractPage_1.default {
    constructor(params, title = "Recipes") {
        super(params, title);
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const recipes = this.loaderData;
            let recipesHtml = "";
            if (recipes) {
                recipesHtml = recipes
                    .map((recipe) => {
                    return new StatelessRecipeCard_js_1.default(recipe).render();
                })
                    .join("");
            }
            let view = `
        <section class="prose">
      <h1>Recipes Page</h1>

      <h2>What do we provide?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <section>
        <article class="service">
          <h2>Our Favourite recipes</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>
        <article class="service">
          <h2>Want to show off your recipe?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>
      </section>
      <section class="recipe-container">
        ${recipesHtml}
      </section>
      ${new Link_js_1.default({
                href: "/recipes/new",
                text: "Add a Recipe",
            }).render()}
    </section>
        `;
            return view;
        });
    }
    clientScript() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.default = Recipes;
