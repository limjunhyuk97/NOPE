<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="w-full lg:p-10 py-14 px-6" in:fade={{ duration: 500 }}>
	<slot />
</div>
