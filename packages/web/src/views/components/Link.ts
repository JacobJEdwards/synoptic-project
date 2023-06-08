import { StatelessComponent as Component} from "@lib/components";

export type LinkProps = {
    href: string;
    text: string;
};

export default class Link extends Component {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    const { href, text } = this.props;
    return `<a href="${href}" data-link>${text}</a>`;
  }
}
