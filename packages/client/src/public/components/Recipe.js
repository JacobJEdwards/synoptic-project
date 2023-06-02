/*
model Recipe {
    id          Int      @id @default(autoincrement())
    title       String
    description String?
    ingredients String[]
    origin      String   @default("Unknown")
    steps       String
    vegan       Boolean  @default(false)
    vegetarian  Boolean  @default(false)
    halal       Boolean  @default(false)
    kosher      Boolean  @default(false)
    tags        String[]
    user        User?    @relation(fields: [userId], references: [id])
    userId      Int?
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}
*/
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "css/styles.css";

class Recipe extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    get recipeObject() {
        return this.getAttribute("active");
    }

    set recipeObject(value) {
        this.setAttribute("details", value);
    }

    static get observedAttributes() {
        return ["recipeObject"];
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
    <article class="service">
        <h2>${this.recipeObject.title}</h2>
        <p>${this.recipeObject.description}</p>
    </article>
    `;
    }
}

customElements.define("recipe-item", Recipe);

export default Recipe;
