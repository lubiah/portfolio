import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
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
		borderRadius: {
			none: '0',
			xxs: '0.125rem',
			xs: '0.25rem',
			sm: '0.375rem',
			DEFAULT: '0.5rem',
			md: '0.75rem',
			lg: '1rem',
			xl: '1.5rem',
			full: '9999px'
		},
		colors: {
			white: 'white',
			black: 'black',
			transparent: 'transparent',
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
			gray: colors.neutral,
			info: {
				50: '#F1F5FE',
				100: '#E3EBFC',
				200: '#C2D4F9',
				300: '#9DB9F6',
				400: '#6E98F2',
				500: '#2563EB',
				600: '#1555E0',
				700: '#124AC4',
				800: '#0F3C9F',
				900: '#0A2B70',
				950: '#09235D'
			},
			warning: {
				50: '#fffbeb',
				100: '#fef3c7',
				200: '#fde68a',
				300: '#fcd34d',
				400: '#fbbf24',
				500: '#f59e0b',
				600: '#d97706',
				700: '#b45309',
				800: '#92400e',
				900: '#78350f',
				950: '#451a03'
			}
		},
		extend: {
			lineHeight: {
				tighter: '1.15'
			}
		}
	},

	plugins: []
} satisfies Config;

module.exports = config;
