const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "css/styles.css";

class Header extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
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
    <header>
        <h1>Worldwide Recipes</h1>
        <h3 id="slogan">Recipes for the world by the world</h3>
    </header>
    `;
  }
}

customElements.define("custom-header", Header);

export default Header;
