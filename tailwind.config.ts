import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const config = {

	content: ['./src/**/*.{html,js,svelte,ts,md}'],

	theme: {
		screens: {
			xs: '360px',
			mobile: '640px',
			tablet: '768px',
			laptop: '1024px',
			desktop: '1280px',
			tv: '1536px'
		},
		
		colors: {
			primary: {
				50: '#FFF5F5',
				100: '#FFE6E6',
				200: '#FFC7C7',
				300: '#FFA4A4',
				400: '#FE7171',
				500: '#ED0101',
				600: '#D50101',
				700: '#BC0101',
				800: '#9D0101',
				900: '#7A0000',
				950: '#560000'
			},
			gray: colors.neutral	
		},
		extend: {
			
		}
	},

	plugins: []
} satisfies Config;

module.exports = config;
