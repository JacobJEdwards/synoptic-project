export default class AbstractComponent {
    constructor(parentElement: HTMLElement, props: Object);
    parentElement: HTMLElement;
    props: Object;
    init(): Promise<void>;
    getHtml(): Promise<string>;
    getTemplate(): Promise<HTMLTemplateElement>;
    render(): Promise<void>;
    afterRender(): Promise<void>;
}
//# sourceMappingURL=AbstractComponent.d.ts.map