<script lang="ts">
  import type { DataHandler, OrderBy, Row } from '@vincjo/datatables';
  import Icon from '$lib/icons/Icon.svelte';

  type T = $$Generic<Row>;

  export let handler: DataHandler<T>;
  export let orderBy: OrderBy<T>;

  const identifier = orderBy?.toString();
  const sorted = handler.getSorted();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="table-cell p-4 pt-2 pb-2 font-medium text-left border-b-2 border-surface-200 dark:border-surface-400 dark:hover:bg-surface-hover-token"
  class:cursor-pointer={orderBy}
  on:click={() => handler.sort(orderBy)}
  class:active={$sorted.identifier === identifier}
>
  <div class="flex">
    <div class="font-medium">
      <slot />
    </div>
    {#if orderBy}
      {#if $sorted.identifier === identifier}
        {#if $sorted.direction === 'asc'}
          <Icon icon="arrow-small-up" />
        {:else}
          <Icon icon="arrow-small-down" />
        {/if}
      {:else}
        <Icon icon="arrows-up-down" />
      {/if}
    {/if}
  </div>
</div>
