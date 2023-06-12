import {AbstractPage as Page} from "@lib/components"
import type {Params} from "@lib/types"

export default class About extends Page {
    constructor(params: Params, title = "About Us") {
        super(params, title);
    }

    override async getHtml() {
        const view = `
        <section class="prose">
        <h1 class="text-2xl">About Us Page</h1>
        <section class='about_box'>
            <h1>
                Our team
            </h1>
            <br>
            <div class='about_content'>
                <ul>
                    <li>Jacob</li>
                    <li>Josh</li>
                    <li>Neil</li>
                    <li>Brandon</li>
                    <li>Henry</li>
                    <li>Alfie</li>
                </ul>
            <div>
        </section>
        <section class='about_box'>
        <h1>
            What the website is about
        </h1>
        <br>
        <div class='about_content'>
            <p>
                This website is designed to showcase recepies from around the world. This is where people can upload and exchange their own recepies, while also learning new recepies from different cultures.
            </p>
        </div>
        </section>
        <section class='about_box'>
        <h1>
            How our website helps the community
        </h1>
        <br>
        <div class='about_content'>
            <p>
                This website will help the community to learn about the different cultures and dishes from around the world. This will also help to give budget friendly ideas for their meals.
            </p>
        </div>
    </section>
        </section>
        `;

        return view;
    }

    override async clientScript(): Promise<void> {
        return;
    }
}
