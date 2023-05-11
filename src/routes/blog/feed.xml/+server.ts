import type { RequestHandler } from "@sveltejs/kit";
import { getArticlesHTML } from "..";
import  { encodeHtml } from "$utils";

const generateItems = (articles: any[]):string=>{ 
    let items = '';
    articles.forEach(article => {
        items += 
`
<item>
    <title>${article.title}</title>
    <link>https://www.kudadam.com/blog/${article.slug}</link>
    <description>${encodeHtml(article.html)}</description>
    <guid>https://www.kudadam.com/blog/${article.slug}</guid>
    <pubDate>${article.date}</pubDate>
</item>
`.trim()
    });
    return items;
}

export const GET = (async ()=>{
    const articles = await getArticlesHTML();
    const rssItems = generateItems(articles);
    const rssTemplate =
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
        <title>Kudadam's Blog</title>
        <link>https://wwww.kudadam.com/blog</link>
        <description>Articles</description>
        ${rssItems}
    </channel>
    </rss>
    `.trim();

    return new Response(rssTemplate, {
        headers: {
            "Content-Type": "application/xml"
        }
    })

}) satisfies RequestHandler;