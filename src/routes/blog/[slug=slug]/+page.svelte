<script lang="ts">
	import type { PageData } from "./$types";

	import ClockIcon from "$icons/clock.svg?component";
	import CalendarIcon from "$icons/calendar.svg?component";

	export let data: PageData;
</script>

<main>
	<div id="hero" style:--background-image="url({data.metadata.image})">
		<div class="text-white bg-black/80 px-4 py-12">
			<h1 class="mt-0 mb-12">{data.metadata.title}</h1>
			<ul class="p-0 flex flex-col gap-y-2">
				<li class="flex items-center gap-x-1">
					<ClockIcon height="16" width="16"/>
					<span>{data.metadata.readingTime.text}</span>
				</li>
				<li class="flex items-center gap-x-1">
					<CalendarIcon height="16" width="16"/>
					<time
						datetime={new Date(data.metadata.date).toISOString()}
						>{new Date(data.metadata.date).toLocaleString('en-US', { dateStyle: 'long' })}</time
					>
				</li>
			</ul>
		</div>
	</div>
</main>


<style lang="postcss">
	#hero {
		background: var(--background-image);
	}
</style>