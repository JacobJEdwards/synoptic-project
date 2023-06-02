const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "css/styles.css";

class Footer extends HTMLElement {
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
    <footer>
        <p>Copyright ©2023 Worldwide Recipes</p>
    </footer>
    `;
  }
}

customElements.define("custom-footer", Footer);

export default Footer;
