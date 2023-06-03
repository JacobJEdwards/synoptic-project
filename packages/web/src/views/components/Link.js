import Component from "./StatelessComponent.js";

export default class Link extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { href, text } = this.props;
    return `<a href="${href}">${text}</a>`;
  }
}