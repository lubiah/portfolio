---
title: Creating a reading progress indicator in Svelte
description: A little write up about how to create a reading progress indicator for Svelte
date: 2022-07-06
updated: 2023-05-21
excerpt: A little write up about how to create a reading progress indicator for Svelte
image: https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/hero
tags:
  - svelte
---

<script lang="ts">
  import Percentage from "./percentage.svelte";
</script>

This site has a cool reading progress indicator at the bottom of the page, and I will show you how I made it. Honestly, I didn't write all the code myself. I took a [similar library (svelte-page-progress)](https://www.npmjs.com/package/svelte-page-progress) and modified it to suit my needs. It lacked a lot of features.

His library only allowed you to set the `height` and `color` but I needed more than that so I made mine. Mine allows you to set `color`, `position`, `zIndex`,`height` and `background`, pretty cool huh:wink:? So let's move on to how I created it.

## The JavaScript

```svelte
<script lang="ts">
    let width: string = "0%";
    export let zIndex: number = 999;
    export let color: string = "tomato";
    export let background: string  = "transparent";
    export let height: string = "5px";
    export let position: "bottom" | "top" | "left" | "right" = "bottom";

    const watchScroll = ()=> { 
        const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
        const height = scrollHeight - clientHeight;
        const scroll = `${(scrollTop / height) * 100}%`;
        width = scroll;  
	} 
</script>
``` 

On the first 7 lines, we created the component props (properties) and set their defaults.

Let's explain the `watchScroll` function. It's the function responsible for calculating the scroll percentage.
We first extract the `scrollHeight`, `clientHeight` and `scrollTop` from the `document.documentElement` object. The `document.documentElement` object refers to the root element of the HTML document which is the `<html>` element. Let's take a look at the three properties which we extracted:

- `scrollHeight`: It is a property which contains the total height of the element, including the parts below the screen which is not visible to us. Simply, it's the total height of an element.
- `clientHeight`: It is a property which contains the height of the element within the viewport. It represents the height of the visible contents you see without needing to scroll down the page.
- `scrollTop`: It is a property which contains the number of pixels the document has been scrolled from the top. When the page is not yet scrolled, its value is 0.

<figure>
  <img src="https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/document_element.jpg" alt="Screenshot explaining clientHeight, scrollTop and scrollHeight" width="500" height="700">
  <figcaption>Screenshot explaining <code>clientHeight</code>, <code>scrollTop</code> and <code>scrollHeight</code></figcaption>
</figure>

A picture speaks a thousand words so I've added one to explain the three properties. The border marked in green is the `clientHeight`. Just as I explained, it is the height of the element within the viewport. You can imagine the green border as the browser window only showing the first visible content. The content below the green border will require you to scroll before you can view them.
The red border is the `scrollHeight`. It refers to the total height of the element including the part not visible in the viewport. The blue arrow shows where the `scrollTop` starts reading from. Just as we explained. It contains the number of pixels which we have scrolled down the screen. Since we have not yet scrolled down, it's value is 0. Meaning we haven't yet scrolled that page.

On line 11, we set the `height` constant by subtracting the `clientHeight` from the `scrollHeight` to get the actual scrollable height of the element.

### Why we subtract clientHeight from scrollHeight

The formula for calculating scroll percentage is `percentage = (scrollTop / (scrollHeight  - clientHeight)) * 100`

At first, I never understood why we had to subtract `clientHeight` from `scrollHeight` when calculating the scroll percentage, because since basic school, the formula for percentage has always been `(progress / total) * 100`. The truth is, the scroll percentage formula still works just the same as how the good'ol percentage formula works. 

Let me explain, since we are calculating scroll percentage, we must exclude the height which doesn't need scrolling to be visible. If you do not subtract the `clientHeight` from the `scrollHeight`, you will get incorect values because of how the `scrollTop` property is.

Basically, this is how percentages work.

<Percentage/>

If you understand how percentages work, then understanding the rest will be a piece of cake:wink:. To understand, you can take the progress as `scrollTop` and the total as `(scrollHeight - clientHeight)`. Let me use an image to explain the subtraction.

<figure>
  <img src="https://ik.imagekit.io/kudadam/blog/svelte-reading-progress/clientheight_minus_scrollheight.jpg" alt="Illustration to explain why we subtract clientHeight from scrollHeight">
  <figcaption>Illustration to explain why we subtract <code>clientHeight</code> from <code>scrollHeight</code></figcaption>
</figure>

Looking at the image we can see where the `scrollTop` property starts reading from. It starts directly after where `clientHeight` ends so in order to get the total, we need to subtract the `clientHeight` from the `scrollHeight`. If the `scrollTop` property were to start from the beginning of the document. We would have added `clientHeight` and `scrollHeight` to get the total. So this is the reason why on line 11, we created the `height` constant.
On the next line, we calculated the scroll percentage and assigned it to the `scroll` constant. Next, we update the `width` variable with the value from the scroll constant.
That's all for the JavaScript part, let's move on to HTML.


## The HTML

<!--FIXME: Change the language to html later-->
```html
<div class="svelte-scrollprogress-container {position}" style:--ssp-background={background}> <!--  [tl! reindex(30)] --> 
	<div
		class="svelte-scrollprogress {position}" 
		style:--ssp-color={color}
		style:--ssp-height={height}
		style:--ssp-width={width}
		style:--ssp-z-index={zIndex}
	>
	</div>
</div>
<svelte:window on:scroll={watchScroll} on:load={watchScroll} />

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
	} /*[tl! collapse:end]*/
</style>
```

For the Svelte part, we have a parent `div` and a nested child `div`. Basically, one `div` would have been enough but because we want to be able to set the background colour, we need to add another element to handle that.
For the parent `div` which we will refer to as `container`, has a width of 100%. This is because, it needs to occupy 100% of the position in which it is placed. The child `div` is the element which is going to control the progress. It's width percentage will be based on the value returned from the `watchScroll` function. It will be dynamically applied using [`--style-props`](https://svelte.dev/docs#template-syntax-component-directives---style-props). The other component properties are also applied using `--style-props`. If you haven't heard about it, it allows you to add styles to a component just as you would with a `style` attribute on an element. We also added an `onscroll` event listener to the window component. This event listener fires the `watchScroll` function each time the user scrolls the page. This in turn also updates the width of the `div` element.
The `colour`, `height` and `zIndex` values are also set the same way using `--style-props`.

### The Styles (CSS)

```css {no_frame=true}
.svelte-scrollprogress-container { /* [tl! reindex(43)] */
		position: fixed;
		background: var(--ssp-background);
		width: 100%;
		margin: 0;
		padding: 0;
		left: 0;
	}
```
These are the styles which are applied to the `container`. It has a position of fixed so that it stays exactly where we place it. The `background` property sets the background colour of the `container` using CSS variables.
It also has a width of 100% so that it occupies the whole space in which it is placed in. Then I removed all padding and margin. The `left` property marks sure that the element starts at the very edge of the viewport.


```css {no_frame=true} 
	.top {/* [tl! reindex(52)] */
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
```

Remember I said earlier that my library allows you to set the position of the progress bar? Well yeah, these classes are applied depending on the position chosen.

```css {no_frame=true}
	.svelte-scrollprogress { /*[tl! reindex(77)]*/
		z-index: var(--ssp-z-index);
		background: var(--ssp-color);
		height: var(--ssp-height);
		width: var(--ssp-width);
		transition: width 100ms ease-out;
	}
```

These are the classes which are applied to the progress bar `div`. It contains a z-index which is by default 999. This ensures that, it stays above other elements. The background property here sets the colour of the progress bar. Then the height and width are also adjustable values that can be set with CSS variables. Then finally we added a transition to make the progress bar filling look smooth.

## Wrapping up
The rest of the code is self-explanatory. I published the component to npm as `svelte-scrollprogress`. You can easily install it with npm using `npm add -D svelte-scrollprogress`. Here is a github [ link to the repo](https://github.com/kudadam/svelte-scrollprogress). Do give it a star.