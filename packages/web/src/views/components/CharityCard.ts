import { AbstractComponent as Component } from "@lib/components";
import type { Charity } from "@lib/types";

export default class RecipeCard extends Component {
  constructor(parentElement: HTMLElement, charity: Charity) {
    super(parentElement, charity);
  }

  async getHtml() {
    const charity = this.props;

    return `
        <section class="charity-card">
            <h2>${charity.name}</h2>
            <p>
                <a href="${charity.website}" target="_blank" rel="noopener noreferrer">View Website</a>
            </p>
        </section>
            `;
  }
}
