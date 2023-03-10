<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col w-full h-full lg:p-10 py-14 px-6" in:fade={{ duration: 500 }}>
	<slot />
</div>
