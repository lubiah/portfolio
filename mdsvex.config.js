import { defineMDSveXConfig as defineConfig } from 'mdsvex';

import remark_slug from 'remark-slug';
import remark_breaks from 'remark-breaks';
import remark_emoji from 'remark-emoji';
import remark_gfm from 'remark-gfm';
import remark_directive from 'remark-directive';
import remark_parse from 'remark-parse';
import remark_frontmatter from 'remark-frontmatter';
import remark_torchlight from '@kudadam/remark-torchlight';
import remark_escape from './remarkPlugins/escapeEntities/index.js';
import remark_editor from './remarkPlugins/codeBlocks/index.js';
import remark_readingTime from './remarkPlugins/readingTime/index.js';
import remark_mermaid from './remarkPlugins/mermaid/index.js';
import remark_notes from './remarkPlugins/notes/index.js';

const config = defineConfig({
	extensions: ['.md'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		remark_parse,
		remark_frontmatter,
		remark_directive,
		remark_slug,
		remark_breaks,
		remark_gfm,
		remark_mermaid,
		remark_editor,
		remark_readingTime,
		remark_notes,
		[
			remark_emoji,
			{
				accessible: true
			}
		],
		[
			remark_torchlight,
			{
				config: {
					theme: 'dracula',
					cache: '.torchlight-cache'
				}
			}
		],
		remark_escape
	],
	rehypePlugins: []
});

export default config;
