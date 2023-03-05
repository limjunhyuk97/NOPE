<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { getQueryString } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let done_message: string;
	export let links: { text: string; href: string }[];

	let showIcon = false;
	let showLink = false;
	let activity_id = getQueryString('id');

	onMount(() => {
		setTimeout(() => {
			showIcon = true;
		}, 400);
		setTimeout(() => {
			showLink = true;
		}, 800);
	});
</script>

<div
	class="relative flex flex-col justify-center items-center gap-6 w-full h-full lg:p-10 py-14 px-6 text-lg"
>
	{#if showIcon}
		<div
			class="absolute flex flex-col items-center gap-4 mb-64"
			in:fly|local={{ duration: 1000, y: 120 }}
		>
			<div class="flex items-center justify-center w-44 h-44 rounded-full bg-gray-400 text-white">
				<Icon icon="check" size={128} />
			</div>
			<h1 class="text-2xl font-bold">{done_message}</h1>
		</div>
	{/if}
	{#if showLink}
		<div
			class="absolute flex flex-col items-center gap-4 mt-56"
			in:fly|local={{ duration: 1500, y: 120 }}
		>
			{#each links as link}
				<a href={link.href} class="px-4 py-2 rounded text-xl font-semibold hover:underline"
					>{link.text}</a
				>
			{/each}
		</div>
	{/if}
</div>
