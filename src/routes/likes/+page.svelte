<script lang="ts">
	import type { Like } from '$lib/types/likes';
	import PageWrapper from '$lib/template/PageWrapper.svelte';
	import Activity from '$lib/components/activities/Activity.svelte';
	import { fade } from 'svelte/transition';
	import moment from 'moment';

	/** @type {import('./$types').PageData} */
	export let data: any;

	const Likes: ArrayLike<Like> = data.likes;
</script>

<PageWrapper>
	<div class="PAGETITLE">찜한 활동</div>
	{#if Likes?.length}
		<div class="grid xl:grid-cols-4 grid-cols-3 gap-4 gap-y-0 mb-8 ">
			{#each Likes as { activities: { title, recruiting, start_at, end_at, id, status, images, short_details, activity_types } }}
				<Activity
					imgUrl={images?.storage_id}
					{id}
					{title}
					{recruiting}
					{status}
					{short_details}
					{activity_types}
					startDate={moment(start_at).format('YYYY-MM-DD')}
					endDate={moment(end_at).format('YYYY-MM-DD')}
					isLikePage={true}
				/>
			{/each}
		</div>
	{:else}
		<div class="mt-12">아직 찜한 활동이 없습니다!</div>
	{/if}
</PageWrapper>
