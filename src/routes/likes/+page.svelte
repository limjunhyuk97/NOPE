<script lang="ts">
	import type { Like } from '$lib/types/likes';
	import Activity from '$lib/components/activities/Activity.svelte';
	import { fade } from 'svelte/transition';
	import moment from 'moment';

	/** @type {import('./$types').PageData} */
	export let data: any;

	const Likes: ArrayLike<Like> = data.likes;
</script>

<div class="w-full lg:p-10 py-14 px-6" in:fade={{ duration: 500 }}>
	<div class="lg:mt-8 mb-4 lg:text-3xl text-xl">찜한 활동</div>
	{#if Likes?.length}
		<div class="grid grid-cols-3 2xl:gap-10 gap-3">
			{#each Likes as { activities: { title, recruiting, start_at, end_at, id, status, images, short_details } }}
				<Activity
					imgUrl={images?.storage_id}
					{id}
					{title}
					{recruiting}
					{status}
					{short_details}
					startDate={moment(start_at).format('YYYY-MM-DD')}
					endDate={moment(end_at).format('YYYY-MM-DD')}
					isLikePage={true}
				/>
			{/each}
		</div>
	{:else}
		<div class="mt-12">아직 찜한 활동이 없습니다!</div>
	{/if}
</div>
