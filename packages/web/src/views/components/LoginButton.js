import Component from './StatelessComponent.js'

export default class LoginButton extends Component {
    constructor() {
        super()
    }
    render() {
        return `
            <button class="login-button">Login</button>
        `
    }
}
