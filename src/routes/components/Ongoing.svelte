<script lang="ts">
	import type { ActivityTypes } from '../+layout';
	import { slide } from 'svelte/transition';
	import { activitiesToShow } from '$lib/stores';
	import { goto } from '$app/navigation';
	export let activityTypes: ArrayLike<ActivityTypes>;

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
	진행중인 활동
	{#if hovering}
		<div class="pt-4 flex flex-col items-start gap-4 text-sm" transition:slide>
			{#each activityTypes as activity}
				<button
					class="ml-2"
					on:click|preventDefault|stopPropagation={() => {
						goto('/');
						$activitiesToShow = activity.type;
					}}>{activity.type_kor}</button
				>
			{/each}
		</div>
	{/if}
</button>
