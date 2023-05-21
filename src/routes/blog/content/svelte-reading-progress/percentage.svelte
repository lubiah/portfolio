<script lang="ts">
	import { onMount } from "svelte";

    let container: HTMLDivElement;
    let inner: HTMLDivElement;
    let total: number;
    let progress: number;

    onMount(()=>{
        total = container.clientWidth;
        progress = inner.clientWidth;
    })

    const change = (event: Event)=>{
        const value = (event.target as HTMLInputElement).value;
        inner.style.width = `${((+value / total) * 100)}%`;
        progress = +value;

    }
</script>

<div id='container' bind:this={container} class='mb-3'>
    <div id='inner' bind:this={inner}>
    </div>
</div>
<p class="!my-0 text-base">
    Total: {total}<br/>
    Progress: {progress}<br/>
    Percentage = (progress / total) * 100<br/>
    Percentage = ({progress} / {total}) * 100 = {Math.round((progress/total)*100)}%

</p>

<input type="range"  min="0" max="{total}" value={progress} on:input={change}>
<small class='block text-center mt-1 italic'>You can drag the slider to see how it calculates</small>

<style type="text/postcss">
    #container {
        @apply w-[100%] border-2 border-black h-[28px];
    }

    #inner {
        height: 100%;
        width: 64%;
        background-color: brown;
    }
</style>