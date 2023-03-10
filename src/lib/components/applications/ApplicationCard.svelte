<script lang="ts">
	import { getSignedUrl } from '$lib/utils';
	import { applyStatusColor, applyStatus } from '$lib/utils';

	export let name: string;
	export let status: string;
	export let image_id: string;
	export let href: string;
</script>

<a
	class="flex flex-col justify-between w-full h-32 p-2 rounded border border-gray-200 hover:bg-gray-100"
	{href}
>
	<div class="flex items-center gap-4">
		{#await getSignedUrl(image_id)}
			<div class="w-12 h-12 rounded-full bg-gray-200" />
		{:then src}
			{#if src}
				<img {src} alt={name} class="w-12 h-12 rounded-full object-cover" />
			{:else}
				<div class="w-12 h-12 rounded-full bg-gray-200" />
			{/if}
		{:catch err}
			<div class="w-12 h-12 rounded-full bg-gray-200" />
		{/await}
		<h2>{name}</h2>
		<span class="{applyStatusColor(status)} font-semibold">· {applyStatus(status)}</span>
	</div>
	<div class="flex justify-end gap-2 w-full">
		<slot />
	</div>
</a>
