import { AbstractPage as Page } from "@lib/components"
import type { Params } from "@lib/types"

export default class Error404 extends Page {
    constructor(params: Params, title="404 - Page Not Found") {
        super(params, title);
    }

    async getHtml() {
        let view = `
            <h1>404 - Page Not Found</h1>
            <p>Sorry, but the page you were trying to view does not exist.</p>
        `;

        return view;
    }

    async clientScript(): Promise<void> {
        return;
    }
}
