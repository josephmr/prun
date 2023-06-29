<script lang="ts">
  import { type DataHandler, type Row, Search } from '@vincjo/datatables';

  type T = $$Generic<Row>;

  export let handler: DataHandler<T>;

  export let search = true;

  let element: HTMLElement;

  const height = search ? 48 : 8;

  const triggerChange = handler.getTriggerChange();
  $: $triggerChange, scrollTop();

  const scrollTop = () => {
    if (element) element.scrollTop = 0;
  };
</script>

<div>
  {#if search}
    <div class="flex flex-row-reverse pb-2">
      <Search {handler} />
    </div>
  {/if}

  <div bind:this={element} style="height:calc(100% - {height}px)" class="bg-surface-800">
    <slot />
  </div>
</div>
