import { defineMDSveXConfig as defineConfig } from 'mdsvex';

import remark_slug from "remark-slug";
import remark_breaks from "remark-breaks";
import remark_emoji from "remark-emoji";
import remark_gfm from "remark-gfm";
import remark_torchlight from "@kudadam/remark-torchlight";

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
		}],
		[remark_torchlight, {
			config: {
				theme: 'dracula',
				cache: '.torchlight-cache'
			}
		}]
	],
	rehypePlugins: []
});

export default config;
