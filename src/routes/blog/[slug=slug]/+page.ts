import type { PageLoad } from './$types';

export const load = (async ({ params, data }) => {
	const { slug } = params;
	const article = await import(`../content/${slug}/index.md`);
	const component = await article.default;
	const metadata: ArticleMeta = { ...article.metadata, slug };

	return {
		component,
		metadata,
		toc: data.toc
	};
}) satisfies PageLoad;
