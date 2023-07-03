<script lang="ts">
  import type {PageData} from './$types';
  export let data: PageData;
</script>

<div>
  {#each data.production as prod}
    <p>{prod.Type}</p>
  {/each}
</div>
