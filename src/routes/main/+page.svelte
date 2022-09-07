<script lang="ts">
	import Activity from './components/activity.svelte';
	import type { Activities, Activity_Types } from './+page.js';
	import moment from 'moment';

	/** @type {import('./$types').PageData} */
	export let data;

	let types: ArrayLike<Activity_Types> = data.activityTypes;

	let studies: ArrayLike<Activities> = data.activities.filter(
		(el: Activities) => el.activities_type.type === 'study'
	);
	let projects: ArrayLike<Activities> = data.activities.filter(
		(el: Activities) => el.activities_type.type === 'project'
	);
</script>

<!-- Activity 컴포넌트 주입 -->
<div class="w-full">
	<div class="text-3xl mt-12">스터디</div>
	<div class="mt-8 grid grid-cols-3 gap-6">
		{#each studies as { title, recruiting, start_at, end_at, status, activities_info_images }}
			<Activity
				imgUrl={activities_info_images[0].images.url}
				{title}
				{recruiting}
				{status}
				startDate={moment(start_at).format('YYYY-MM-DD')}
				endDate={moment(end_at).format('YYYY-MM-DD')}
			/>
		{/each}
	</div>
	<div class="text-3xl mt-12">프로젝트</div>
	<div class="mt-8 grid grid-cols-3">
		{#each projects as { title, recruiting, start_at, end_at, status, activities_info_images }}
			<Activity
				imgUrl={activities_info_images[0].images.url}
				{title}
				{recruiting}
				{status}
				startDate={moment(start_at).format('YYYY-MM-DD')}
				endDate={moment(end_at).format('YYYY-MM-DD')}
			/>
		{/each}
	</div>
</div>
