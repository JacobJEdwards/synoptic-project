import Component from "./StatelessComponent.js";

export default class StatelessComment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const comment = this.props;
        return `
            <div class="comment">
                <p>${comment.message}</p>
            </div>
        `;
    }
}
