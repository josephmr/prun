<script lang="ts">
  import { round } from '$lib/utils';
  import type { RowDefinition } from './index';
  import { Th } from './index';
  import { type DataHandler, type Row, Search } from '@vincjo/datatables';

  type T = $$Generic<Row>;

  export let handler: DataHandler<T>;
  export let rowDefinitions: RowDefinition<T>[];
  export let search = true;
  const rows = handler.getRows();
  handler.sort(rowDefinitions[0].orderBy ?? rowDefinitions[0].key);

  let element: HTMLElement;

  const height = search ? 48 : 8;
</script>

<div>
  {#if search}
    <div class="flex flex-row-reverse pb-2">
      <Search {handler} />
    </div>
  {/if}

  <div bind:this={element} style="height:calc(100% - {height}px)" class="bg-surface-800">
    <div class="grid" style={`grid-template-columns: repeat(${rowDefinitions.length}, auto);`}>
      {#each rowDefinitions as rowDef}
        <Th {handler} orderBy={rowDef.orderBy ?? rowDef.key}>{rowDef.header}</Th>
      {/each}
      {#each $rows as row, index}
        {#each rowDefinitions as rowDef}
          {@const value = row[rowDef.key]}
          <div class:stripe={index % 2 === 0} class="table-cell p-4 pb-2 pt-2">
            {typeof value === 'number' ? round(value) : row[rowDef.key]}
          </div>
        {/each}
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  .stripe {
    background-color: rgba(var(--color-surface-700));
  }
  .grid {
    max-height: 80vh;
    overflow: auto;
  }
</style>
