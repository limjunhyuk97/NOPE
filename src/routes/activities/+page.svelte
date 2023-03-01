<script lang="ts">
	import type { ActivityCard } from '$lib/types/activities';
	import type { ActivityTypes } from '$lib/types';
	import { activitiesToShow } from '$lib/stores';
	import { ACTIVITY_TYPE, ACTIVITY_FILTER } from '$lib/constants';
	import Activity from '$lib/components/activities/Activity.svelte';
	import ActivityFilter from '$lib/components/filter/Filter.svelte';
	import { fade } from 'svelte/transition';
	import moment from 'moment';

	/** @type {import('./$types').PageData} */
	export let data: any;

	// 활동 타입에 따라 전체 활동 분할
	const Activities = data.activityTypes.reduce((acc: any, cur: ActivityTypes) => {
		acc[cur.type] = data.activities.filter(
			(el: ActivityCard) => el.activity_types.type === cur.type
		);
		return acc;
	}, {});
	Activities[ACTIVITY_TYPE.ALL] = data.activities;

	// 활동 타입 한글명
	$: filteredActivityType =
		$activitiesToShow === ACTIVITY_TYPE.ALL
			? '전체활동'
			: data.activityTypes.filter((el) => el.type === $activitiesToShow)[0].type_kor;

	// 필터 적용
	$: recruitFilter = ACTIVITY_FILTER.ALL.type;

	// '필터링'된 & '타입에 일치'하는 활동
	$: filteredActivities = () => {
		return Activities[$activitiesToShow].filter((el: ActivityCard) => {
			if (recruitFilter === ACTIVITY_FILTER.ALL.type) return true;
			else return el.recruiting === (ACTIVITY_FILTER.RECRUITING.type === recruitFilter);
		});
	};
</script>

<div class="lg:p-10 py-14 px-6" in:fade={{ duration: 500 }}>
	<div class="flex items-center gap-8 w-full mt-8 mb-4 ">
		<div class="text-2xl font-bold">{filteredActivityType}</div>
		<ActivityFilter bind:filtered={recruitFilter} />
	</div>

	{#if filteredActivities()?.length}
		<div class="grid xl:grid-cols-4 grid-cols-3 gap-4 gap-y-0 mb-8 ">
			{#each filteredActivities() as { title, recruiting, start_at, end_at, id, status, images, short_details, activity_types }}
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
					liked={data.likes.some((likedActivityId) => likedActivityId.activity_id === id)}
				/>
			{/each}
		</div>
	{:else}
		<div class="mt-12">해당되는 활동이 없습니다!</div>
	{/if}
</div>
