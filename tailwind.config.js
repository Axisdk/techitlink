/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,ts,js}'],
	theme: {
		extend: {},
	},
	plugins: [require('rippleui')],
};
