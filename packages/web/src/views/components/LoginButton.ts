import { StatelessComponent as Component } from '@lib/components'

export default class LoginButton extends Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return `
            <button class="login-button">Login</button>
        `
    }
}
