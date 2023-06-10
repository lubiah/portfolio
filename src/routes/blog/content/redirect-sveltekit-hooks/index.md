---
title: How to make a redirect in SvelteKit hooks
description: Using the handle function in sveltekit hooks, we can create redirects for our application
date: 2022-07-11
updated: 06-10-2023
expiry: 2023-10-10
excerpt: Using the handle function in sveltekit hooks, we can create redirects for our application
tags:
  - svelte
---

At first, the URL to my RSS feed was https://kudadam.com/blog/feed but later on, I decided to change it to https://kudadam.com/blog/feed.xml. I had to make sure that those using the old URL still got access to the feed. For example, on [Dave Rubert's website](https://daverupert.com/rss-club/), he uses the old URL.

We are going to use hooks to achieve the redirect. The advantage of using hooks to make the redirect is that we are able to encapsulate all our redirects in one place. We will use the `handle` function, this function runs everytime a request is made to our app so it's the best way to handle it. We will use a server hook.
Paste the following code inside your `src/hooks.server.js` file.

```javascript {filename=hooks.server.js filepath=src/hooks.server.js}
/** @type {import('@sveltejs/kit').Handle} */
export const handle = ()=>{

}
```