---
title: Creating A Reading Progress Indicator In Svelte
description: A little write up about how to create a reading progress indicator for Svelte
date: 2022-07-06
excerpt: A little write up about how to create a reading progress indicator for Svelte
image: https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/hero
tags:
  - svelte
---

This site has a really cool reading progress indicator at the bottom of the page, and I will show you how I made it. Honestly, I didn't write all the code myself. I took a [similar library (svelte-page-progress)](https://www.npmjs.com/package/svelte-page-progress) and modified it to suit my needs. It lacked a lot of features.

His library only allowed you to set the `height` and `color` but I needed more than that so I made mine. Mine allows you to set `color`, `position`, `zIndex`,`height` and `background`, pretty cool huh:wink:? So let's move on to how I created it.

## The JavaScript

```svelte
<script lang="ts">
    import { debounce } from "./utils.js";
    import { createEventDispatcher } from "svelte";

    let width: string = "0%";
    export let zIndex: number = 999;
    export let color: string = "tomato";
    export let background: string  = "transparent";
    export let height: string = "5px";
    export let position: "bottom" | "top" | "left" | "right" = "bottom";

  

    const dispatch = createEventDispatcher();

	dispatch("change",{
		width: width
	})

    const watchScroll = ()=>{ // [tl! focus:start]
        const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
        const height = scrollHeight - clientHeight;
        const scroll = `${(scrollTop / height) * 100}%`;
		width = scroll;  
	} // [tl! focus:end]
</script>
``` 

On the first 10 lines, we created the component props and set their defaults. Also, we imported the `debounce` function which I will provide it's code below.

Let's explain the `watchScroll` function. It's the function responsible for calculating the scroll percentage.
We first extract the `scrollHeight`, `clientHeight` and `scrollTop` from the `document.documentElement` variable. The `document.documentElement` variable typically refers to the root element of the HTML document which is the `<html>` element. Let's take a look at the three variables which we extracted:

- `scrollHeight`: It is a property which contains the total height of the element, including the parts below the screen which is not visible to us. Simply, it's the total height of an element.
- `clientHeight`: It is a property which contains the height of the element within the viewport. It represents the height of the visible contents you see without needing to scroll down the page.
- `scrollTop`: It is a property which contains the number of pixels the documents has been scrolled from the top. When the page is not yet scrolled, it's value is 0.

<figure>
  <img src="https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/document_element.jpg" alt="Screenshot explaining clientHeight, scrollTop and scrollHeight" width="500" height="700">
  <figcaption>Screenshot explaining <code>clientHeight</code>, <code>scrollTop</code> and <code>scrollHeight</code></figcaption>
</figure>

A picture speaks a thousand words so I've added one to explain the three properties. The border marked in <span style="color:#30cd00">green</span> is the `clientHeight`. Just as I explained, it is the height of the element within the viewport. You can imagine the green border as the browser window only showing the first visible content. Content below the green border will require you to scroll before you can view them.
The <span style="color:#ff0001">red</span> border is the `scrollHeight`. It refers to the total height of the element including the part not visible in the viewport. The <span style="color:#018cfe">blue</span> arrow shows where the scrollTop starts reading from. Just as we explained. It contains the number of pixels which we have scrolled down the screen.Since we have not yet scrolled down, it's value is 0. Meaning we haven't yet scrolled that page.