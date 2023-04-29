<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data : PageServerData;
</script>

<ul>
    {#each data.articles as article}
        <li>
            <a href="/blog/{article.slug}">{article.title}</a>
        </li>
    {/each}
</ul>