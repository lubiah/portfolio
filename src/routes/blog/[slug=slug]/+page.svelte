<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import ClockIcon from '$icons/clock.svg?component';
	import CalendarIcon from '$icons/calendar.svg?component';
	import tocSpy from './tocSpy';
	import Head from "svelte-seo";
	import Progress from "svelte-scrollprogress";
	import { onMount } from 'svelte';

	const SEO = {
		title: `${data.metadata.title} • Kudadam`,
		description: data.metadata.description
	}

	onMount(async () => {
		const article: HTMLElement| null = document.querySelector('article');
		if (article) tocSpy(article);
		const mermaidBlocks: NodeListOf<HTMLElement> | null = document.querySelectorAll('.mermaid-diagram');
		const panZoom = await import("./panZoom").then(module => module.default);
		mermaidBlocks.forEach(block => panZoom(block));
		
	});
</script>

<Head
	title= {SEO.title}
	description = {SEO.description}
/>

<main class="max-w-screen-laptop mx-auto px-4 tablet:px-0">
	<h1 class="mt-0 mb-12 tablet:mb-16 laptop:mb-20">
		{data.metadata.title}
	</h1>

	<div class="-ml-4 -mr-4"> 
	<img
		src={data.metadata.image}
		alt=""
		loading="eager"
		class="w-full h-auto max-h-[250px] tablet:max-h-[400px] laptop:object-cover mb-6 tablet:mb-8 laptop:mb-10"
	/>
	</div>
	<ul
		class="text-gray-500 mb-6 tablet:mb-8 laptop:mb-10 text-xs laptop:text-base flex flex-col tablet:flex-row gap-2 tablet:gap-x-6 laptop:mx-0 p-0"
	>
		<li class="flex items-center gap-x-1">
			<ClockIcon height="16" width="16" /><span>{data.metadata.readingTime.text}</span>
		</li>
		<li class="flex items-center gap-x-1">
			<CalendarIcon height="16" width="16" /><time
				datetime={new Date(data.metadata.date).toISOString()}
				>{new Date(data.metadata.date).toLocaleString('en-US', { dateStyle: 'long' })}</time
			>{#if data.metadata.updated}
				(Updated on<time datetime={new Date(data.metadata.updated).toISOString()}
					>{new Date(data.metadata.updated).toLocaleString('en-US', { dateStyle: 'long' })}</time
				>)
			{/if}
		</li>
	</ul>
	<div class="laptop:flex justify-between">
		<article>
			<svelte:component this={data.component} />
		</article>
		{#if data.toc}
			<nav class="toc hidden max-w-[250px] laptop:block">
				<p class="font-bold mb-3">Table of contents</p>
				<div>
					{@html data.toc}
				</div>
			</nav>
		{/if}
	</div>
</main>
<Progress color="#ED0101"/>

<style lang="postcss">

	article {
		@apply max-w-prose tablet:mx-0 mb-[60px];

		& > :global(:first-child) {
			@apply mt-0;
		}

		& :global(.code-block-wrapper){
			@apply -ml-4 -mr-4 tablet:ml-0 tablet:mr-0;
		}
	}


	nav.toc {
		@apply h-max sticky top-[20%];

		& :global(:is(ul, ol)) {
			@apply p-0 list-image-none;
		}

		& :global(:is(ul, ol) :is(ul, ol) :is(.toc-link)) {
			@apply pl-8;
		}

		& :global(li){
			@apply my-0;
		}

		& :global(a) {
			@apply pl-4 py-1 px-0.5 block transition-colors duration-300 border-l-2 hover:[&:not(.active)]:bg-gray-50;
		}
		& :global(.active) {
			@apply border-l-2 border-primary-400 text-primary-500;
		}

		& :global(*) {
			@apply text-sm text-gray-500;
		}

		& :global(ul) {
			@apply list-none;
		}
	}
</style>
