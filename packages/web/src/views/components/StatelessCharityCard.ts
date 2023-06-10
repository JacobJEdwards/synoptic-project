import {StatelessComponent as Component} from "@lib/components";
import type {Charity} from "@/lib/types";

export default class StatelessCharityCard extends Component {
    constructor(props: Charity) {
        super(props);
    }

    render() {
        const charity = this.props as Charity;

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
