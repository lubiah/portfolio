import {getArticlesMetadata } from './';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const articles = await getArticlesMetadata();
	return {
		articles
	};
}) satisfies PageServerLoad;
