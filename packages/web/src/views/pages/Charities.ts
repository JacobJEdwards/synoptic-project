import { AbstractPage as Page } from "@lib/components";
import type { Charity, LoaderFunction, Params } from "@lib/types";

import { getCharities } from "@services/charity.service";
import CharityCard from "@components/StatelessCharityCard";

export const loader: LoaderFunction<Charity[] | null> = async () => {
  const charities = await getCharities();

  if (!charities)
    return {
      success: false,
      data: null,
      error: "Failed to load charities",
    };

  return {
    success: true,
    data: charities,
  };
};

export default class Charities extends Page {
  constructor(params: Params, title = "Charities") {
    super(params, title);
  }

  override async getHtml() {
    let charities = this.loaderData?.data as Charity[];

    const additonalCharities = [
      {
        id: 100,
        name: "Get Into Govan",
        description:
          "This group is made up of many organisations listed below, along with local community members. They are working together as a group to achieve better food outcomes in Govan. Aberlour,  Elderpark Housing Association, Gilded Lily, Glasgow City Council Neighbourhoods & Sustainability (Growing Spaces), Glasgow City HSCP (Health Improvement),  Glasgow Community Food Network, Glasgow Housing Association, Glasgow Life, Go Vegan Govan, Govan Boxing Club, Govan Community Project, Govan HELP, Govan Housing Association, Govan Youth Information Point,  Moogety Foods, Preshal Trust, Propagate, The Riverside Hall, and Urban Roots.",
        website:
          "https://getintogovan.com/thriving-places-food-for-good-group/",
      },
      {
        id: 101,
        name: "Moogety Foods",
        description:
          "Moogety Foods is a non-profit social enterprise based in Govan, Glasgow, promoting healthy eating, cooking and participation within the community.",
        website:
          "https://elderpark.org/your-community/projects/moogety-foods-moogety-food-hub-moogety-garden/",
      },
      {
        id: 102,
        name: "Govan Pantry",
        description:
          "The Govan Pantry is a subsidised community shop that helps families to shop smarter and budget better, providing access to food and other essential items at reduced cost.",
        website: "https://www.govanhelp.org/services/the-govan-pantry",
      },
    ] as Charity[];

    if (charities) {
      charities.unshift(...additonalCharities);
    } else {
      charities = additonalCharities;
    }

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

  override async clientScript() {
    return;
  }
}
