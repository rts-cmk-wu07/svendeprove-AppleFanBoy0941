/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		fontFamily: {
			sans: ['Ubuntu', 'Inter', 'sans-serif'],
			display: ['Racing Sans One', 'Inter', 'sans-serif'],
			'display-header': ['Roboto', 'Inter', 'sans-serif'],
		},
		extend: {
			colors: {
				elevated: '#EAEAEA',
				background: '#5E2E53',
				primary: '#E1A1E9',
				text: '#000000',
			},
			fontSize: {
				xl: '24px',
			},
		},
	},
	plugins: [
		function ({ addBase }) {
			addBase({ html: { fontSize: '1.125rem' } })
		},
	],
}
