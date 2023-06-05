import Link from "./Link.js";
import Component from "./StatelessComponent.js";

export default class StatelessCharityCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const recipe = this.props;
        if (!recipe) return "";

        const link = new Link({
            href: `/recipes/${recipe.id}`,
            text: "View Recipe",
        });

        return `
                <figure>
                    <img src="/views/images/placeholder.jpg" alt="${recipe.name
            }" />
                    <figcaption>
                        <h2>${recipe.title}</h2>
                        <p>${recipe.description}</p>
                        ${link.render()}
                    </figcaption>
                </figure>
            `;
    }
}
