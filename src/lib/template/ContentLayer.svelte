<script lang="ts">
	export let title: string;
	export let subtitle = '';
</script>

<div class="w-full h-full">
	<div class="flex flex-col gap-4 my-8">
		<h1 class="text-3xl">{title}</h1>
		{#if subtitle.length > 0}
			<h2 class="mb-4 text-xl">{subtitle}</h2>
		{/if}
	</div>
	<slot />
</div>
