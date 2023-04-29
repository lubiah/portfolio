import { getArticlesList } from './';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const articles = await getArticlesList();
	return {
		articles
	};
}) satisfies PageServerLoad;
