---
title: How to generate RSS feed for your SvelteKit website
description: Learn how to generate an RSS feed for your SvelteKit website with this step-by-step guide. Keep your readers up-to-date with your latest content
image: https://ik.imagekit.io/kudadam/blog/generate-rss-feed-sveltekit/hero?updatedAt=1683294694031
excerpt: Adding an RSS feed to your website is an excellent way to notify readers when new blog posts are published
tags:
  - svelte
  - sveltekit
date: 2021-07-18
---

Before I knew about RSS (Really Simple Syndicate), this was how I used to stay updated with my favourite websites. I will bookmark the website, and then everyone once in a while, I will go to the website and see if they have posted new content. Well I know😂, this was tiring because I always needed to check up on the websites once in a while.

Fast forward, I came to learn about RSS and it's what I've been using since. Currently, I use the [Inoreader app](inoreader.com). With it, I organize all my favourite feeds and whenever any of them updates their content, I get a notification. I'm not going to dive into how RSS works, I do believe you know how it works and we are going to look at how to incorporate it into our SvelteKit website.

## Basic structure of an RSS feed 

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>Website name</title>
  <link>https://www.example.com</link>
  <description>A nice description of your website</description>
  <item>
    <title>blog post 1</title>
    <link>https://www.example.com/link/to/blog/1</link>
    <description>A description about the article</description>
  </item>
  <item>
    <title>blog post 2</title>
    <link>https://www.example.com/link/to/blog/2</link>
    <description>A description about the article</description>
  </item>
</channel>

</rss>
```

The code above is the basic structure of an RSS feed. It's written in XML, a markup language just like HTML. Its tags contain the necessary information needed by RSS readers to understand the contents published. Now, let's go over the tags

| Tag name              | Description                                                  |
| --------------------- | :----------------------------------------------------------- |
| channel               | This is a container tag. <br />It contains three required tags that describe the feed. |
| channel > title       | This refers to the name of the channel. An example is 'Kudadam Blog' |
| channel >  link       | This is a link to the website which is providing the feed. A valid example is the URL to your website |
| channel > description | A general description of the channel                         |
| item                  | The item tag is also another container tag. Its contents talk about a single idea. An example is a blog post |
| item > title          | The title of your article or blog post                       |
| item > link           | The URL to your article or blog post                         |
| item > description    | The description of your blog post. Some prefer to include the encoded version of the blog posts whiles others prefer to give a summary of the blog post over here. <br />If you're embedding the HTML over here, you must properly encode it. |
| item > category       | If you categorize your articles, you can include the category here (optional) |
| item > pubDate        | The date the article was published                           |

The table above shows a list of the possible tags we can use to make a simple RSS feed, if you want more features, you can go ahead and [find valid tags over here](https://validator.w3.org/feed/docs/rss2.html).

## Implementing it in SvelteKit

Now we have seen how to structure our RSS feed, we can then move on to implement it in our SvelteKit website. Most websites have their feed on this URL https://www.example.com/feed.xml or https://www.example.com/rss. I think this version (https://www.example.com/feed.xml) looks cool or depending on your choice, you can choose any.

In your `src/routes/` folder, create a folder whose name will be the path to your RSS feed. Since I'm creating the feed for my blog, this is how I will place my folder, `src/routes/blog/feed.xml` where the `feed.xml` is the folder which is going to contain the RSS feed.  Inside the folder, create a server endpoint file (`+server.js`). The reason why we are using a `+server.js` file is that, we want to have full control of the response, this is because we aren't going to return HTML but XML.

So this is how I created my endpoint, explanations are below.

```javascript {filename=+server.js filepath=src/routes/blog/feed.xml/+server.js}
import { getArticlesHTML } from "..";
import { encodeHtml } from "$utils";

const generateItems = (articles) => { // [tl! collapse:start]
  let items = "";
  articles.forEach((article) => {
    items += `
      <item>
        <title>${article.title}</title>
        <link>https://www.kudadam.com/blog/${article.slug}</link>
        <description>${encodeHtml(article.html)}</description>
        <guid>https://www.kudadam.com/blog/${article.slug}</guid>
        <pubDate>${article.date}</pubDate>
      </item>
    `.trim();
  });
  return items; // [tl! collapse:end]
}; 

export const GET = async () => {
  const articles = await getArticlesHTML();
  const rssItems = generateItems(articles);
  const rssTemplate = `
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
      "Content-Type": "application/xml",
    },
  });
};

```



Now, let's go over the code we wrote.

1. We used the `GET` handler since we are retrieving content from the server.

2. Then, we retrieved all our articles from an asynchronous function named `getArticlesHTML`.

   This function returns a JSON which contains articles in this format.

   ```typescript
   interface getArticlesHTML {
   	title: string,
   	description?: string,
   	image?: string,
   	date: Date,
   	excerpt?: string,
   	tags?: string[],
   	html: string,
   	slug: string
   }[]
   ```

   No big deal if you don't understand Typescript. All that I'm trying to say is that the function returns an array of objects with these properties. The optional properties are the ones with the `?` and the required ones are the ones without it. For your code to work with mine, it doesn't matter where you're pulling your data from. The returned data types should match mine.

3. The next function `generateItems` takes the array returned from `getArticlesHTML` and converts it into its RSS equivalent form.
   It iterates over each object and converts the required fields to its RSS equivalent. The `encodeHtml` function encodes the entities in the HTML (converting  '<', and '>' to  "\&#60;" and  '\&#62'; )

4. We finally insert the RSS equivalent of the contents into the RSS template which we have generated with the `rssTemplate` variable.
   Do not forget the `.trim()` method because the document will not display if there are spaces before the declaration of the tags.

5. We return the results as a response and set the content type as 'application/xml'. It's important to set the content type so that the browser won't interpret it as an HTML file. 

## Wrapping up

If you're to head localhost:5173/blog/feed.xml, you will see the RSS displaying lively without any errors. If you want to customize your RSS more, there are more tags you can add to it.

Also, I wanted people visiting my feed through this URL (localhost:5173/blog/feed.xml) to also access it when they visited localhost:5173/blog/feed so I made a redirect to allow that. I will write about it soon.
