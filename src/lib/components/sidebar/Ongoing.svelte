<script lang="ts">
	import type { ActivityType } from '$lib/types/activities';
	import { slide } from 'svelte/transition';
	import { activitiesToShow } from '$lib/stores';
	import { goto } from '$app/navigation';

	// 활동 타입 정보
	export let activityTypes: ArrayLike<ActivityType>;

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
		goto('/activities');
		$activitiesToShow = 'all';
	}}
	on:mouseenter={mouseEnter}
	on:mouseleave={mouseOut}
	class="p-4 border-b text-start"
>
	활동
	{#if hovering}
		<div class="pt-4 flex flex-col items-start gap-4 text-sm" transition:slide>
			{#each activityTypes as activity}
				<button
					class="ml-2"
					on:click|preventDefault|stopPropagation={() => {
						goto('/activities');
						$activitiesToShow = activity.type;
					}}>{activity.type_kor}</button
				>
			{/each}
		</div>
	{/if}
</button>
