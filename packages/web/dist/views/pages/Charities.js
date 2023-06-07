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
const charity_service_js_1 = require("../services/charity.service.js");
const StatelessCharityCard_js_1 = __importDefault(require("../components/StatelessCharityCard.js"));
const loader = () => __awaiter(void 0, void 0, void 0, function* () {
    const charities = yield (0, charity_service_js_1.getCharities)();
    return charities;
});
exports.loader = loader;
class Charities extends AbstractPage_1.default {
    constructor(params, title = "Charities") {
        super(params, title);
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const charities = this.loaderData;
            let charitiesHtml = "";
            if (charities) {
                charitiesHtml = charities
                    .map((charity) => {
                    return new StatelessCharityCard_js_1.default(charity).render();
                })
                    .join("");
            }
            const view = `
    <section class="prose">
      <h1>Charities Page</h1>
      <p>
        <a href="https://getintogovan.com/thriving-places-food-for-good-group/"
          >Get into Govan</a
        >
      </p>
      <p>
        <a
          href="https://elderpark.org/your-community/projects/moogety-foods-moogety-food-hub-moogety-garden/"
          >Moogety Foods</a
        >
      </p>
      <p>
        <a href="https://www.govanhelp.org/services/the-govan-pantry"
          >Govan Pantry</a
        >
      </p>
      <section class="charity-container">
        ${charitiesHtml}
      </section>
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
exports.default = Charities;
