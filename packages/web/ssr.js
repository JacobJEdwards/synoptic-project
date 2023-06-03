const puppeteer = require("puppeteer");

async function srr(url) {
    try {
        console.log("url", url);
        const pageurl = `http://localhost:3001${url}`;
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();
        await page.goto(pageurl, { waitUntil: "networkidle2" });
        await page.waitForSelector("#app");
        await page.$eval("#app", ({ dataset }) => {
            dataset.fetched = true;
        });
        const html = await page.content();
        console.log(html);
        await browser.close();
        return html;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = srr;
