import {StatelessComponent as Component} from "@lib/components";
import type {Charity} from "@/lib/types";

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
            <h1>
                <a href="${charity.website}" target="_blank" rel="noopener noreferrer">
                    ${charity.name}
                </a>
            </h1>
            <br />
            <p>
                <span class="charity-info">info about the charity:</span><br /><br />
                ${charity.description}
            </p>
            </article>
            <div class="float-right">
                <img src="views/images/placeholder.jpg" alt="Charity Logo" />
            </div>
            </section>
            `;
    }
}
