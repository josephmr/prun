<script lang="ts">
  // The ordering of these imports is critical to your app working properly
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  // Most of your app wide CSS should be put in this file
  import '../app.postcss';

  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup, AppShell, AppBar, Modal } from '@skeletonlabs/skeleton';
  import FioAuth from '$lib/components/FioAuth.svelte';
  import type { PageData } from './$types';

  // Setup floating-ui for modals/tooltips
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  export let data: PageData;
</script>

<Modal />

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <span class="font-bold text-2xl pl-2">PrUn Tools</span>
      </svelte:fragment>
      <svelte:fragment slot="trail"><FioAuth authInfo={data.authInfo} /></svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
</AppShell>
