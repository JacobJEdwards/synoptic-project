export default abstract class StaticComponent {
  props: any;
  constructor(props: any) {
    this.props = props;
  }

  abstract render(): string;
}
