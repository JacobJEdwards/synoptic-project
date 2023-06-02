const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "css/styles.css";

class Navbar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    get active() {
        return this.getAttribute("active");
    }

    set active(value) {
        this.setAttribute("active", value);
    }

    static get observedAttributes() {
        return ["active"];
    }

    connectedCallback() {
        this.render();
        this.shadow.appendChild(cssLink);
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
    <nav>
      <ul>
        <li class="nav ${this.active && "active"}"><a href="/">Home</a></li>
        <li class="nav ${this.active && "active"
            }"><a href="/recipes">Recipes</a></li>
        <li class="nav ${this.active && "active"
            }"><a href="/charities">Charities</a></li>
        <li class="nav ${this.active && "active"
            }"><a href="about">About Us</a></li>
      </ul>
    </nav>
    `;
    }
}

customElements.define("nav-bar", Navbar);

export default Navbar;
