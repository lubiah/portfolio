import { defineMDSveXConfig as defineConfig } from 'mdsvex';

import remark_slug from "remark-slug";

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		remark_slug
	],
	rehypePlugins: []
});

export default config;
