<script lang="ts">
	import Activity from '$lib/components/likes/Activity.svelte';
	import type { Likes } from '$lib/types/likes';
	import { fade } from 'svelte/transition';

	export let Likes: ArrayLike<Likes>;
</script>

<div in:fade={{ duration: 500 }}>
	<div class=" lg:mt-8 mb-4 lg:text-3xl text-xl">찜한 활동</div>
	{#if Likes?.length}
		<div class="mb-8 grid lg:grid-cols-3 2xl:gap-10 lg:gap-3">
			{#each Likes as { id, activities }}
				<Activity {id} {activities} />
			{/each}
		</div>
	{:else}
		<div class="mt-12">아직 찜한 활동이 없습니다!</div>
	{/if}
</div>
