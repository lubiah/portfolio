import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { slug } = params;
	const article = (await import(`../content/${slug}/index.md`)).default.render()['html'];
	const tocModule = (await import('$utils/toc')).default;
	const toc = tocModule(article);


	return {
		toc
	};
}) satisfies PageServerLoad;
