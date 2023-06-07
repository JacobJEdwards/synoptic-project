module.exports = {
    plugins: [
        //tailwindcss: {},
        //require('tailwindcss')('./tailwind.config.cjs'),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
