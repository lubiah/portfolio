---
title: How to prevent theme colour from flickering in SvelteKit
description: Learn how to prevent theme colour flickering in SvelteKit with these simple tips. Keep your website looking professional with this easy-to-follow guide
image: https://ik.imagekit.io/kudadam/blog/prevent-theme-colour-flickering-svelte/hero
date: 2021-10-15
excerpt: My theme colours have always flickered on page load since I started using Svelte. Finally, I discovered a workaround.
tags:
  - svelte
  - sveltekit
---


My theme colour used to flicker after the page had finished loading. Eventually, I found a way to fix it.

## The problem

Initially, I used to change the theme colour of my website within the `onMount` function. However, the theme colour was always flickering. The cause of this was that the body loads before the `onMount` function sets the theme colour.

<figure>
	<img alt="How the screen was flickering before I found a solution" src="https://ik.imagekit.io/kudadam/blog/prevent-theme-colour-flickering-svelte/flickering.gif?" class="w-auto" height="500" width="500">
	<figcaption>A gif showing the bug</figcaption>
</figure>

So as you can see, when the page is reloaded, the light theme is first shown, and then after the document has finished loading, the `onMount` function sets the theme colour.

## Solution

The only likely option is to set the theme colour before the body loads. We do this by inserting a script tag into the head element, and this code is executed before the body is loaded. That is the most effective approach to prevent colour flickering.

## The Code

Okay, so you can write this code in the component which you use to toggle between the themes.

```svelte
<svelte:head>
	<script>
		if (document) {
			let mode = localStorage.theme || 'light';
			if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
				localStorage.theme = 'dark';
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.theme = 'light';
			}
		}
	</script>
</svelte:head>
```

To access the head element, we used the `<svelte:head>` component. Next, we created the script tag just as we would on our normal HTML pages. In the following lines, we attempt to retrieve the theme from `localStorage`. If it’s not set, it defaults to the “light” theme. The next steps involve adding classes and setting the theme in `localStorage`. Finally, observe how the page loads without flickering.

<figure>
	<img alt="Now the page loads without flickering" src="https://ik.imagekit.io/kudadam/blog/prevent-theme-colour-flickering-svelte/non-flickering.gif?tr=w-500" class="w-auto" width="500" height="500">
	<figcaption>Now the page doesn't flicker again</figcaption>
</figure>