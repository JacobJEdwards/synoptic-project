import Component from "./StatelessComponent.js";

export default class Link extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { href, text } = this.props;
    return `<a href="${href}" data-link>${text}</a>`;
  }
}
