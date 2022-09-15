<script lang="ts">
	import type { ActivityTypes } from '../+layout';
	import { slide } from 'svelte/transition';
	import { activitiesToShow } from '$lib/stores';
	import { goto } from '$app/navigation';

	let hovering = false;
	const mouseEnter = () => {
		hovering = true;
	};
	const mouseOut = () => {
		hovering = false;
	};
</script>

<button
	on:click|preventDefault={() => {
		goto('/');
		$activitiesToShow = 'all';
	}}
	on:mouseenter={mouseEnter}
	on:mouseleave={mouseOut}
	class="p-4 border-b text-start"
>
	내 활동
	{#if hovering}
		<div class="pt-4 flex flex-col items-start gap-4 text-sm" transition:slide>
			<button
				class="ml-2"
				on:click|preventDefault|stopPropagation={() => {
					goto('/likes');
				}}>찜한 활동</button
			>
			<button
				class="ml-2"
				on:click|preventDefault|stopPropagation={() => {
					goto('/users/admin');
				}}>운영중인 활동</button
			>
			<button
				class="ml-2"
				on:click|preventDefault|stopPropagation={() => {
					goto('/users/activites');
				}}>참여중인 활동</button
			>
		</div>
	{/if}
</button>
