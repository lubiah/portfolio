---
title: Creating a reading progress indicator in Svelte
description: A little write up about how to create a reading progress indicator for Svelte
date: 2022-07-06
excerpt: A little write up about how to create a reading progress indicator for Svelte
image: https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/hero
tags:
  - svelte
---

<script lang="ts">
  import Percentage from "./percentage.svelte";
</script>

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

    const watchScroll = ()=> { 
        const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
        const height = scrollHeight - clientHeight;
        const scroll = `${(scrollTop / height) * 100}%`;
        width = scroll;  
	} 
</script>
``` 

On the first 10 lines, we created the component props (properties) and set their defaults. Also, we imported the `debounce` function which I will provide it's code below.

Let's explain the `watchScroll` function. It's the function responsible for calculating the scroll percentage.
We first extract the `scrollHeight`, `clientHeight` and `scrollTop` from the `document.documentElement` variable. The `document.documentElement` variable typically refers to the root element of the HTML document which is the `<html>` element. Let's take a look at the three variables which we extracted:

- `scrollHeight`: It is a property which contains the total height of the element, including the parts below the screen which is not visible to us. Simply, it's the total height of an element.
- `clientHeight`: It is a property which contains the height of the element within the viewport. It represents the height of the visible contents you see without needing to scroll down the page.
- `scrollTop`: It is a property which contains the number of pixels the document has been scrolled from the top. When the page is not yet scrolled, it's value is 0.

<figure>
  <img src="https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/document_element.jpg" alt="Screenshot explaining clientHeight, scrollTop and scrollHeight" width="500" height="700">
  <figcaption>Screenshot explaining <code>clientHeight</code>, <code>scrollTop</code> and <code>scrollHeight</code></figcaption>
</figure>

A picture speaks a thousand words so I've added one to explain the three properties. The border marked in green is the `clientHeight`. Just as I explained, it is the height of the element within the viewport. You can imagine the green border as the browser window only showing the first visible content. Content below the green border will require you to scroll before you can view them.
The red border is the `scrollHeight`. It refers to the total height of the element including the part not visible in the viewport. The blue arrow shows where the `scrollTop` starts reading from. Just as we explained. It contains the number of pixels which we have scrolled down the screen. Since we have not yet scrolled down, it's value is 0. Meaning we haven't yet scrolled that page.

On line 22, we set the `height` variable by subtracting the `clientHeight` from the `scrollHeight` to get the actual scrollable height of the element.

### Why we subtract clientHeight from scrollHeight

The formula for calculating scroll percentage is `percentage = (scrollTop / (scrollHeight  - clientHeight)) * 100`

At first, I never understood why we had to subtract `clientHeight` from `scrollHeight` when calculating the scroll percentage, because since basic school, the formula for percentage has always been `(progress / total) * 100`. The truth is, the scroll percentage formula still works just the same as how the good'ol percentage formula works. 

Let me explain, since we are calculating scroll percentage, we must exclude the height which doesn't need scrolling to be visible. If you do not subtract the `clientHeight` from the `scrollHeight`, you will get incorect values because of how the `scrollTop` property is.

Basically, this is how percentages work.

<Percentage/>

If you understand how percentages work, then understanding the rest will be a piece of cake:wink:. In order to understand, you can take the progress as `scrollTop` and the total as `(scrollHeight - clientHeight)`. Let me use an image to explain the subtraction.

<figure>
  <img src="https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/clientheight_minus_scrollheight.jpg" alt="Illustration to explain why we subtract clientHeight from scrollHeight">
  <figcaption>Illustration to explain why we subtract <code>clientHeight</code> from <code>scrollHeight</code></figcaption>
</figure>

Looking at the image we can see where the `scrollTop` property starts reading from. It starts directly after where `clientHeight` ends so in order to get the total, we need to subtract the `clientHeight` from the `scrollHeight`. If the `scrollTop` property were to start from the beginning of the document. We would have added `clientHeight` and `scrollHeight` to get the total. So this is the reason why on line 22, we created the `height` constant.
On the next line we calculated the scroll percentage and assigned it to the `scroll` constant.
Tha'ts all for the JavaScript part, let's move on to HTML.


<!--TODO: Change the language to html later-->
```html
<div class="svelte-scrollprogress-container {position}" style:--ssp-background={background}> <!--  [tl! reindex(30)] -->
	<div
		class="svelte-scrollprogress {position}"
		style:--ssp-color={color}
		style:--ssp-height={height}
		style:--ssp-width={width}
		style:--ssp-z-index={zIndex}
	/>
</div>
<svelte:window on:scroll={debounce(watchScroll)} on:load={debounce(watchScroll)} />

<style> /*[tl! collapse:start] */
	.svelte-scrollprogress-container {
		position: fixed;
		background: var(--ssp-background);
		width: 100%;
		margin: 0;
		padding: 0;
		left: 0;
	}

	.top {
		top: 0;
	}

	.bottom {
		bottom: 0;
	}

	.left {
		height: var(--ssp-width) !important;
		width: var(--ssp-height) !important;
		left: 0;
		bottom: 0;
		top: 0;
	}

	.right {
		top: 0;
		height: var(--ssp-width) !important;
		width: var(--ssp-height) !important;
		right: 0;
		bottom: 0;
		left: initial !important;
	}

	.svelte-scrollprogress {
		z-index: var(--ssp-z-index);
		background: var(--ssp-color);
		height: var(--ssp-height);
		width: var(--ssp-width);
		transition: width 100ms ease-out;
	} /** [tl! collapse:end] */
</style>
```