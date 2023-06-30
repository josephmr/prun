<script lang="ts">
  import { reduceRecord } from '$lib/utils';

  export let parent: any;

  const formData = {
    username: '',
    apiKey: ''
  };
  let shouldShowValidation = reduceRecord(formData, (k) => false);
  type FormKey = keyof typeof formData;

  function isValid(): boolean {
    return Object.values(valid).every(Boolean);
  }

  function triggerShowValidation(key: FormKey) {
    shouldShowValidation = {
      ...shouldShowValidation,
      [key]: true
    };
  }

  function submit() {
    if (!isValid()) {
      shouldShowValidation = reduceRecord(formData, (k) => true);
      return;
    }
    // TODO save credentials in cookie
    parent.onClose();
  }

  $: valid = reduceRecord(formData, (key) => !!formData[key]);
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
  <header class="text-2xl font-bold">FIO Settings</header>
  <article>
    <p>Provide FIO username and API key to unlock additional features.</p>
    <p class="text-xs text-surface-600-300-token">Write access is not required.</p>
  </article>
  <form class="space-y-4">
    <label class="label">
      <span class="text-sm">Username</span>
      <input
        class="input"
        class:input-error={!valid.username && shouldShowValidation.username}
        type="text"
        bind:value={formData.username}
        on:blur={() => triggerShowValidation('username')}
        placeholder="XxPlanetDestroyerxX"
      />
    </label>
    <label class="label">
      <span class="text-sm">API Key</span>
      <input
        class="input"
        class:input-error={!valid.apiKey && shouldShowValidation.apiKey}
        type="text"
        bind:value={formData.apiKey}
        on:blur={() => triggerShowValidation('apiKey')}
        placeholder="00000000-0000-0000-000000000000"
      />
    </label>
  </form>
  <footer class="flex justify-end space-x-2">
    <button class="btn variant-ghost leading-tight" on:click={parent.onClose}>Cancel</button>
    <button class="btn variant-filled leading-tight" on:click={submit}>Save</button>
  </footer>
</div>
