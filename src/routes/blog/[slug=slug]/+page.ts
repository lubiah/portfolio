import type { PageLoad } from './$types';

export const load = (async ({ params, data }) => {
	const { slug } = params;
	const article = await import(`../content/${slug}/index.md`);
	const component = await article.default;
	const readingTime = data.readingTime;
	const metadata: BlogPost = { ...article.metadata, slug, readingTime };

	return {
		component,
		metadata,
		toc: data.toc
	};
}) satisfies PageLoad;
