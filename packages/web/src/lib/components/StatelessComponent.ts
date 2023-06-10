export default abstract class StaticComponent {
    props: any;

    protected constructor(props: any) {
        this.props = props;
    }

    abstract render(): string;
}
