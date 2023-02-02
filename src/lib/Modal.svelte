<script>
	import { modal } from '$lib/stores';
</script>

{#if $modal}
	<div class="fixed top-0 left-0 w-screen h-screen bg-black opacity-40 z-10" />
	<div class="fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-10">
		<slot />
	</div>
{/if}
