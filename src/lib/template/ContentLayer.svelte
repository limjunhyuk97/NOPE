<script lang="ts">
	import Back from '$lib/Back.svelte';
	export let title: string;
	export let subtitle = '';
	export let hasBack = false;
</script>

<div class="w-full h-full">
	<div class="flex flex-col gap-4 my-8">
		<div class="flex items-center gap-4">
			{#if hasBack}
				<Back />
			{/if}
			<h1 class="h-7 text-2xl font-bold">{title}</h1>
		</div>
		{#if subtitle.length > 0}
			<h2 class="mb-4 text-xl font-semibold">{subtitle}</h2>
		{/if}
	</div>
	<slot />
</div>
