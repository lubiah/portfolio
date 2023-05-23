// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare interface ArticleMeta {
	title: string;
	description: string;
	excerpt: string;
	image: string;
	slug: string;
	date: Date;
	updated?: Date;
	readingTime: {
		text: string,
		minutes: number,
		time: number,
		words: number
	};
	draft: true
}


