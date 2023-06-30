<script lang="ts">
  import type { DataHandler, OrderBy, Row } from '@vincjo/datatables';
  import Icon from '$lib/components/icons/Icon.svelte';

  type T = $$Generic<Row>;

  export let handler: DataHandler<T>;
  export let orderBy: OrderBy<T>;

  const identifier = orderBy?.toString();
  const sorted = handler.getSorted();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="sticky top-0 p-4 pt-2 pb-2 font-medium text-left border-b-2 border-surface-400 hover:bg-surface-700 bg-surface-900"
  class:cursor-pointer={orderBy}
  on:click={() => handler.sort(orderBy)}
  class:active={$sorted.identifier === identifier}
>
  <div class="flex">
    <div class="font-medium">
      <slot />
    </div>
    {#if orderBy}
      <div class="flex justify-center flex-col pl-2">
        {#if $sorted.identifier === identifier}
          {#if $sorted.direction === 'asc'}
            <Icon icon="arrow-small-up" />
          {:else}
            <Icon icon="arrow-small-down" />
          {/if}
        {:else}
          <Icon icon="arrows-up-down" />
        {/if}
      </div>
    {/if}
  </div>
</div>
