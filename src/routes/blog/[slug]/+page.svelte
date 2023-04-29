<script lang="ts">
	import type { PageData } from './$types';

	import ClockIcon from '$icons/clock.svg?component';
	import CalendarIcon from '$icons/calendar.svg?component';
	import tocSpy from './tocSpy';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(async () => {
		const article = document.querySelector('article');
		if (article) {
			tocSpy(article);
		}
	});
</script>

<main class="max-w-screen-laptop mx-auto min-w-0">
	<h1 class="mb-12 tablet:mb-16 laptop:mb-20 laptop:!col-[1/-1] mx-4 laptop:mx-0">
		{data.metadata.title}
	</h1>
	<img
		src={data.metadata.image}
		alt=""
		class="w-full h-auto max-h-[250px] tablet:max-h-[400px] laptop:object-cover mb-6 tablet:mb-8 laptop:mb-10 !col-[1/-1]"
	/>
	<ul
		class="text-gray-500 mb-6 tablet:mb-8 laptop:mb-10 text-xs laptop:text-base flex flex-col tablet:flex-row gap-2 tablet:gap-x-6 mx-4 laptop:mx-0 p-0"
	>
		<li class="flex items-center gap-x-1">
			<ClockIcon height="16" width="16" /><span>{data.metadata.readingTime}</span>
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

<style lang="postcss">
	article {
		@apply grid grid-cols-[1fr_min(65ch,calc(100%-32px))_1fr] laptop:grid-cols-[65ch_1fr];

		& > :global(:first-child) {
			@apply mt-0;
		}
	}

	article :global(*) {
		@apply col-[2/3] laptop:col-[1/2];
	}

	article :global(pre) {
		@apply col-[1/4] laptop:col-[1/2];
	}

	nav.toc {
		@apply h-max sticky top-[20%];

		& :global(:is(ul, ol)) {
			@apply p-0 list-image-none;
		}

		& :global(:is(ul, ol) :is(ul, ol) :is(.toc-link)) {
			@apply pl-8;
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
