import { StatelessComponent as Component } from "@lib/components";
import type { Comment } from "@lib/types";

export default class StatelessComment extends Component {
    constructor(props: Comment) {
        super(props);
    }

    render() {
        const comment = this.props;

        if (!comment) {
            return `
                <div class="comment">
                    <p>Comment not found</p>
                </div>
            `;
        }

        const userName = comment.user ? comment.user.name : "Anonymous";
        return `
            <div class="comment">
                <h4>${userName}</h4>
                <p>${comment.message}</p>
            </div>
        `;
    }
} 
