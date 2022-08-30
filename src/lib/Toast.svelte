<script>
	import { toastMessage } from '$lib/stores';
	import { fade } from 'svelte/transition';

	$: {
		if ($toastMessage) {
			setTimeout(() => {
				$toastMessage = null;
			}, 2000);
		}
	}
</script>

{#if $toastMessage}
	<div
		on:click={() => {
			$toastMessage = null;
		}}
		transition:fade
	>
		{$toastMessage}
	</div>
{/if}
