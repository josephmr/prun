<script lang="ts">
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import Icon from './icons/Icon.svelte';
  import FioAuthModal from './FioAuthModal.svelte';

  let authed = false;
  let modal: ModalSettings = {
    type: 'component',
    component: { ref: FioAuthModal }
  };
</script>

<button
  type="button"
  class="btn btn-sm"
  on:click={() => modalStore.trigger(modal)}
  class:variant-filled-error={!authed}
  class:variant-filled-success={authed}
>
  <Icon icon={authed ? 'check' : 'x-mark'} />
  <span class="leading-snug">FIO</span>
</button>
