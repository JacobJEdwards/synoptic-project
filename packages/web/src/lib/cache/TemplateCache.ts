import BaseCache from "./BaseCache";

export class TemplateCache extends BaseCache<string[]> {
    constructor() {
        super("templates:");
    }
}

export default new TemplateCache();
