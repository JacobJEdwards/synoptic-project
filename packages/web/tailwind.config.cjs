/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.html",
        "./src/**/*.js",
        "./src/*.html",
        "./src/**/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("daisyui"),
    ],
};
