import Link from "./Link";
import { StatelessComponent as Component } from "@lib/components";
import type { Recipe } from "@lib/types";

export default class StatelessCharityCard extends Component {
  constructor(props: Recipe) {
    super(props);
  }

  render() {
    const recipe = this.props;

    const link = new Link({
      href: `/recipes/${recipe.id}`,
      text: "View Recipe",
    });

    const userName = recipe.user ? recipe.user.name : "Anonymous";

    return `
            <article class="services">
                <figure>
                    <img src="/views/images/placeholder.jpg" alt="${
                      recipe.name
                    }" />
                    <figcaption>
                        <h2>${recipe.title}</h2>
                        <p>${recipe.description}</p>
                        <p>By: ${userName}</p>
                        ${link.render()}
                    </figcaption>
                </figure>
                </article>
            `;
  }
}
