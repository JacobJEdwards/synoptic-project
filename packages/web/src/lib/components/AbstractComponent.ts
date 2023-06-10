/**
 * @class AbstractComponent
 * @description Abstract class for all components
 */
export default abstract class AbstractComponent {
    parentElement: HTMLElement;
    props: any;

    /**
     * @constructor
     * @param {HTMLElement} parentElement element where the component will be rendered
     * @param {Object} props properties of the component
     */
    protected constructor(parentElement: HTMLElement, props?: any) {
        this.parentElement = parentElement;
        this.props = props;
    }

    /**
     * @method getHtml
     * @description Returns the HTML of the component
     */
    abstract getHtml(): Promise<string>;

    /**
     * @method getTemplate
     * @description Returns the template of the component
     */
    async getTemplate(): Promise<HTMLTemplateElement> {
        const view = await this.getHtml();
        const template = document.createElement("template");
        template.innerHTML = view;
        return template;
    }

    /**
     * @method render
     * @description Renders the component in the DOM by appending the template to the parentElement
     * @memberof AbstractComponent
     * @instance
     * @returns {Promise<void>}
     */
    async render(): Promise<string | void> {
        if (!this.parentElement) {
            return await this.getHtml();
        }

        const template = await this.getTemplate();
        this.parentElement.appendChild(template.content.cloneNode(true));
        return await this.afterRender();

    }

    /**
     * @method afterRender
     * @description Hook that is executed after the component is rendered
     */
    async afterRender(): Promise<void> {
        return;
    }
}
