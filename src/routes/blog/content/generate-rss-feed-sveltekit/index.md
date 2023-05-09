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

RSS (Really Simple Syndication) is really cool. Honestly, I never knew how useful it was. After re-designing my website with SvelteKit, I wanted to add an RSS feed to it because I noticed some websites were having it. I was adding it for adding sake, never knew how useful it could be.

As we all know, the internet is flooded with information. There are about 1.13 billion websites in the world, as of 2023 and it's really difficult to keep in sync with the websites which really matters to us. 
Yes I know, newsletters are there but if we want a single place where we can keep tab on all our favourite websites and blogs, that's where RSS comes into place. With RSS, we can keep our favourite readers up to date with our contents. Whenever you publish a new content (you must sync your content to your RSS feed), your client will immediately get notified if they have subscribed to your RSS feed. Enough of the history, let's get into code.

## How RSS Works
