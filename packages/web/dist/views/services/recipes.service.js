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
exports.createRecipe = exports.getRecipe = exports.getRecipes = void 0;
function getRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipes = yield fetch("http://localhost:3000/recipes");
            if (!recipes.ok) {
                return [];
            }
            return yield recipes.json();
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
}
exports.getRecipes = getRecipes;
function getRecipe(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipe = yield fetch(`http://localhost:3000/recipes/${id}`);
            if (!recipe.ok) {
                return null;
            }
            return yield recipe.json();
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
exports.getRecipe = getRecipe;
function createRecipe(recipe) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/recipes", {
                method: "POST",
                body: JSON.stringify(recipe),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                return null;
            }
            return yield response.json();
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
exports.createRecipe = createRecipe;
