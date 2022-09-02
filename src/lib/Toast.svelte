<script>
	import { toast } from '$lib/stores';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	$: {
		// $toastMessage에 문자열이 들어오고 2초 뒤에 null로 바꿔라
		if ($toast) {
			setTimeout(() => {
				$toast = null;
			}, 2000);
		}
	}
</script>

{#if $toast}
	<div
		on:click={() => {
			$toast = null;
		}}
		transition:scale={{ duration: 300, delay: 500, start: 0.5, easing: quintOut }}
		class="w-screen mx-auto px-3 py-1 fixed right-0 left-0 top-{$toast.top ??
			20} flex items-center justify-center rounded-3xl opacity-70 bg-blue-500 text-white text-center text-xs z-20"
	>
		{$toast.message}
	</div>
{/if}
