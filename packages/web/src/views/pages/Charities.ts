import Page from "./AbstractPage";
import { getCharities } from "../services/charity.service.js";
import CharityCard from "../components/StatelessCharityCard.js";

export const loader = async () => {
    const charities = await getCharities();
    return charities;
};

export default class Charities extends Page {
    constructor(params: any, title = "Charities") {
        super(params, title);
    }

    async getHtml() {
        const charities = this.loaderData;
        let charitiesHtml = "";

        if (charities) {
            charitiesHtml = charities
                .map((charity: any) => {
                    return new CharityCard(charity).render();
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
    }

    // probably could move to get html
    // ssr
    // async clientScript() {
    //     const charities = this.loaderData;
    //     if (!charities) return;
    //
    //     const charityContainer = document.querySelector(".charity-container");
    //
    //     charities.forEach((charity) => {
    //         const charityElement = document.createElement("article");
    //         charityElement.classList.add("service");
    //
    //         const charityComponent = new CharityCard(charityElement, charity);
    //         charityComponent.init();
    //
    //         charityContainer.appendChild(charityElement);
    //     });

    async clientScript() {
        return;
    }
}
