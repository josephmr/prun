import type { OrderBy } from '@vincjo/datatables';
export { default as Datatable } from './Datatable.svelte';
export { default as Th } from './Th.svelte';

export interface RowDefinition<T> {
  header: string;
  key: keyof T;
  orderBy?: OrderBy<T>;
}
