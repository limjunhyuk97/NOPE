<script lang="ts">
	import { toast } from '$lib/stores';
	import { fly } from 'svelte/transition';

	// $toastMessage에 문자열이 들어오고 2초 뒤에 null로 바꿔라
	$: {
		if ($toast) {
			setTimeout(() => {
				$toast = '';
			}, 1000);
		}
	}
</script>

{#if $toast}
	<div
		on:click={() => {
			$toast = '';
		}}
		transition:fly={{ duration: 300, delay: 500, y: -20 }}
		class="w-max fixed top-6 right-0 left-0 mx-auto rounded-3xl opacity-70 bg-gray-600 text-white text-center text-xs z-10"
	>
		<p class="px-4 py-1">{$toast}</p>
	</div>
{/if}
