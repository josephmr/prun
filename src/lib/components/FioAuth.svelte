<script lang="ts">
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import Icon from '$lib/components/icons/Icon.svelte';
  import FioAuthModal from '$lib/components/FioAuthModal.svelte';
  import type { FIOAuth } from '$lib/auth';

  export let authInfo: FIOAuth | undefined;
  $: authed = !!authInfo;
  $: modal = {
    type: 'component',
    component: {
      ref: FioAuthModal,
      props: {
        ...authInfo
      }
    }
  } as ModalSettings;
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
