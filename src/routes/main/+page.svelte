<script lang="ts">
	import type { ActivityType } from '$lib/types/main';
	import { activitiesToShow } from '$lib/stores';
	import ActivityWrapper from '$lib/components/main/ActivityWrapper.svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;

	const All: ArrayLike<ActivityType> = data.activities;

	const Studies: ArrayLike<ActivityType> = data.activities.filter(
		(el: ActivityType) => el.activity_types.type === 'study'
	);
	const Projects: ArrayLike<ActivityType> = data.activities.filter(
		(el: ActivityType) => el.activity_types.type === 'project'
	);
</script>

<!-- Activity 컴포넌트 주입 -->
<div class="w-full lg:p-12 p-3">
	<!-- all -->
	{#if $activitiesToShow === 'all'}
		<ActivityWrapper Activites={All} activity_type_kor={'전체활동'} />

		<!-- study -->
	{:else if $activitiesToShow === 'study'}
		<ActivityWrapper Activites={Studies} activity_type_kor={'스터디'} />

		<!-- project -->
	{:else if $activitiesToShow === 'project'}
		<ActivityWrapper Activites={Projects} activity_type_kor={'프로젝트'} />
	{/if}
</div>
