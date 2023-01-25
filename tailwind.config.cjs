/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			NOPE: ['Jua', 'sans-serif'],
			sans: ['sans-serif']
		}
	},
	plugins: [require('tailwind-scrollbar-hide')]
};
