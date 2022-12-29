/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#32325D",
                lightprimary: "#C7CEE1",
                gray1: "#7A6666",
                grey6: "#F0F0F0",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
