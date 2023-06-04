import Component from "./StatelessComponent.js";

export default class StatelessCharityCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const charity = this.props;
        if (!charity) return "";

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
