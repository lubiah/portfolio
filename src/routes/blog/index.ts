

export const getArticlesMetadata = async (): Promise<ArticleMeta[]> => {
	const _import = import.meta.glob('./content/**/*.md', {
		eager: true,
		import: 'metadata'
	});
	const files: ArticleMeta[] = [];
	for (const path in _import) {
		const slug = path.split('/')[2];
		const metadata: ArticleMeta = _import[path] as ArticleMeta;
		metadata.date = new Date(metadata.date);
		metadata.slug = slug;
		if (metadata.updated) metadata.updated = new Date(metadata.updated);
		files.push(metadata);
	}

	files.sort((a: ArticleMeta, b: ArticleMeta) => b.date.getTime() - a.date.getTime())

	return files;
};

export const getArticlesHTML = async (): Promise<{
	title: string,
	description: string,
	image: string,
	date: Date,
	excerpt: string,
	tags: string[],
	html: string,
	slug: string
}[]>=>{
	const _import = import.meta.glob('./content/**/*.md');
	const files = [];

	for (const path in _import){
		const slug = path.split('/')[2];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const index: any = await _import[path]();
		const html = index.default.render()['html'];
		const metadata = { ...index.metadata, slug };
		metadata.date = new Date(index.metadata.date);
		if (index.metadata.updated) metadata.updated = new Date(index.metadata.updated);
		files.push(Object.assign({},metadata, {html}));
	}
	
	return files.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
