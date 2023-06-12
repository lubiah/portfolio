---
title: How to make a redirect in SvelteKit hooks
description: Using the handle function in sveltekit hooks, we can create redirects for our application
image: https://ik.imagekit.io/kudadam/blog/redirect-sveltekit-hooks/hero
date: 2022-07-11
updated: 2023-06-12
expiry: 2023-10-10
excerpt: Using the handle function in sveltekit hooks, we can create redirects for our application
tags:
  - svelte
---

At first, the URL to my RSS feed was "/blog/feed" but later on, I decided to change it to "/blog/feed.xml". I had to make sure that those using the old URL still got access to the feed. For example, there's a link to my RSS feed on [Dave Rubert's website](https://daverupert.com/rss-club/), he uses the old URL.

We are going to use [SvelteKit's hooks](https://kit.svelte.dev/docs/hooks) to achieve the redirect. The advantage of using hooks to make the redirect is that we can encapsulate all our redirects in one place. We will use the `handle` function which is available in SvelteKit's hooks. this function runs every time a request is made to our app so it's the best place to handle it. We will be using the server hook since the `handle` function isn't available in the client hook.

## The Code

```javascript {filename=hooks.server.js filepath=src/hooks.server.js}
/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve })=>{
    if (event.url.pathname === '/blog/feed')
        return Response.redirect(`${event.url.origin}/blog/feed.xml`,301);
    return await resolve(event);
}
```
Well, the code is self-explanatory if you understand how SvelteKit hooks work. The `handle` function receives two arguments; the `event` object and the `resolve` function. We then extracted the current path name from the `event` object and check if it's the same as the URL which we want to have a redirect for. If it is, we use `Response.redirect` to redirect the request to the URL we want, else we just return the response.

:::info
The reason why we used `event.url.origin` is that we want to preserve the origin the user used when visiting the URL.

![Structure of a URL](https://ik.imagekit.io/kudadam/blog/redirect-sveltekit-hooks/url-structure.svg)

If you haven't heard about the `origin` property before, you can use the image above to get a basic understanding of it.
For example, if the person visited the URL using `http`, we want to preserve that and not change to `https`. This way, we don't make any major changes to the URL.
:::

## A better approach

At the time of writing this blog post, I always knew that there was a better way I could handle the redirect. If you observe the code above, you can see it works for only one path name. If we wanted more redirects, it's either adding an if statement or writing another `handle` function, which isn't the best solution. I had a solution in mind but I wanted to search online to see if anyone had one, and I found an article by [Justin Golden](https://rgbstudios.org/blog/redirects-in-svelte-kit). It was exactly the idea I had in mind and I decided to build on it.

Here's how the new approach works. 
1. Store all the redirects in a JSON file. 
  They will be stored in this format.

  ```json {filename=redirect.json filepath=src/redirect.json}
  [{
    "from": "source/path",
    "to": "destination/path",
    "status": 301
  },{
    "from": "another/source/path",
    "to": "another/destination",
    "status": 301
  }]
  ```

2. Then in our `handle` function, we just check if the current path name is included in the `from` property of our JSON file. If it's in, we find the destination and redirect to that page. So let's modify our handle function

```javascript {filename=hooks.server.js filepath=src/hooks.server.js}
import redirects from "./redirect.json";

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve })=>{
    let mustRedirect = redirects.find(route => route.from === event.url.pathname);
    if (mustRedirect) return Response.redirect(`${event.url.origin}${mustRedirect.to}`,mustRedirect.status);
    return await resolve(event);

}
```

This version of the redirect is better than the first approach.