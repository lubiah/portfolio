import { defineMDSveXConfig as defineConfig } from 'mdsvex';

import remark_slug from "remark-slug";
import remark_breaks from "remark-breaks";
import remark_emoji from "remark-emoji";
import remark_gfm from "remark-gfm";

const config = defineConfig({
	extensions: ['.md'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		remark_slug,
		remark_breaks,
		remark_gfm,
		[remark_emoji, {
			accessible: true
		}]
	],
	rehypePlugins: []
});

export default config;
