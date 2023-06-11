import { StatelessComponent as Component } from "@lib/components";
import type { Charity } from "@/lib/types";

export default class StatelessCharityCard extends Component {
  constructor(props: Charity) {
    super(props);
  }

  render() {
    const charity = this.props as Charity;

    return `
            <section class="charity-card box">
            <br />
            <article class="float-left">
            <p>
                <span class="charity-info">${charity.name}</span><br /><br />
                ${charity.description}
            </p>
            <a href="${charity.website}" target="_blank" rel="noopener noreferrer">
                <button class="charity-button">Visit ${charity.name}</button>
            </a>
            </article>
            <div class="float-right">
                <img src="views/images/placeholder.jpg" alt="Charity Logo" />
            </div>
            </section>
            `;
  }
}
