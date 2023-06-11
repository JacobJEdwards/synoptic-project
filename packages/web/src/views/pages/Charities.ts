import {AbstractPage as Page} from "@lib/components"
import type {Charity, LoaderFunction, Params} from "@lib/types"

import {getCharities} from "@services/charity.service";
import CharityCard from "@components/StatelessCharityCard";

export const loader: LoaderFunction<Charity[] | null> = async () => {
    const charities = await getCharities();

    if (!charities) return {
        success: false,
        data: null,
        error: "Failed to load charities",
    }

    return {
        success: true,
        data: charities,
    }
};

export default class Charities extends Page {
    constructor(params: Params, title = "Charities") {
        super(params, title);
    }

    async getHtml() {
        const charities = this.loaderData?.data;
        let charitiesHtml = "";

        if (charities) {
            charitiesHtml = charities
                .map((charity: Charity) => {
                    return new CharityCard(charity).render();
                })
                .join("");
        }

        const view = `
        <section class="prose">
        <h1>Charities Page</h1>
        <section class='box'>
          <br>
          <article class='float-left'>
            <h1>
              <a href="https://getintogovan.com/thriving-places-food-for-good-group/"
                >Get into Govan</a
              >
            </h1>
            <br>
              <p>
                <span class="charity-info">info about the charity:</span><br><br> This group is made up of many organisations listed below, along with local community members. They are working together as a group to achieve better food outcomes in Govan. 
                Aberlour,  Elderpark Housing Association, Gilded Lily, Glasgow City Council Neighbourhoods & Sustainability (Growing Spaces), Glasgow City HSCP (Health Improvement),  Glasgow Community Food Network, Glasgow Housing Association, Glasgow Life, Go Vegan Govan, Govan Boxing Club, Govan Community Project, Govan HELP, Govan Housing Association, Govan Youth Information Point,  Moogety Foods, Preshal Trust, Propagate, The Riverside Hall, and Urban Roots."
              </p>
          </article>
          <div class='float-right'>
            <img src='views/images/getintogovan.jpeg'>
          </div>
        </section>
  
        <section class='box'>
          <br>
          <article class='float-left'>
            <h1>
              <a
                href="https://elderpark.org/your-community/projects/moogety-foods-moogety-food-hub-moogety-garden/"
                >Moogety Foods</a
              >
            </h1>
            <br>
            <p>
              <span class="charity-info">info about the charity:</span><br><br> Moogety Foods is a non-profit social enterprise based in Govan, Glasgow, promoting healthy eating, cooking and participation within the community."
            </p>
          </article>
          <div class='float-right'>
            <img src='views/images/moogetyfoods.jpeg'>
          </div>
        </section>
  
        <section class='box'>
          <br>
          <article class='float-left'>
            <h1>
              <a href="https://www.govanhelp.org/services/the-govan-pantry"
                >Govan Pantry</a
              >
            </h1>
            <br>
            <p>
              <span class="charity-info">info about the charity:</span><br><br> The Govan Pantry is a subsidised community shop that helps families to shop smarter and budget better, providing access to food and other essential items at reduced cost."
            </p>
          </article>
          <div class='float-right'>
            <img src='views/images/govanpantry.png'>
          </div>
        </section>
        ${charitiesHtml}
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
