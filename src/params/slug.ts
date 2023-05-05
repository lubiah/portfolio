import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param) => {
    const data = import.meta.glob("../routes/blog/content/**/*.md", {
		import: "metadata"
	});
    const paths = new Array();
    const regex = /(?<=content\/)[^\/]+(?=\/index\.md)/
    for(let path in data){
        let match = regex.exec(path);
        paths.push(match ? match[0] : undefined);
    }

    return paths.find(path => path === param)
}) satisfies ParamMatcher