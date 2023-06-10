import {StatelessComponent as Component} from "@lib/components";
import type {Comment} from "@lib/types";

export default class StatelessComment extends Component {
    constructor(props: Comment) {
        super(props);
    }

    render() {
        const comment: Comment = this.props;

        if (!comment) {
            return `
                <div class="comment">
                    <p>Comment not found</p>
                </div>
            `;
        }

        return `
            <div class="comment">
                <h4>${comment.username}</h4>
                <p>${comment.message}</p>
            </div>
        `;
    }
} 
