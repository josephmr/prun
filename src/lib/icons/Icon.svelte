<script lang="ts">
  export let icon: string;
  export let size: 'sm' = 'sm';

  const clazz = size === 'sm' ? 'w-3 h-3' : '';
</script>

<span class="flex flex-col justify-center p-2">
  {#if icon === 'arrows-up-down'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class={clazz}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      />
    </svg>
  {:else if icon === 'arrow-small-up'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class={clazz}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  {:else if icon === 'arrow-small-down'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class={clazz}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
      />
    </svg>
  {/if}
</span>
