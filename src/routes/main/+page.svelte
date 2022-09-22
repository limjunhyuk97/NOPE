<script lang="ts">
	import type { Activities } from '$lib/types/main';
	import { activitiesToShow } from '$lib/stores';
	import ActivityWrapper from '$lib/components/main/ActivityWrapper.svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;
	console.log(data);

	const All: ArrayLike<Activities> = data.activities;

	const Studies: ArrayLike<Activities> = data.activities.filter(
		(el: Activities) => el.activities_type.type === 'study'
	);
	const Projects: ArrayLike<Activities> = data.activities.filter(
		(el: Activities) => el.activities_type.type === 'project'
	);
</script>

<!-- Activity 컴포넌트 주입 -->
<div class="w-full lg:p-12 p-3">
	<!-- all -->
	{#if $activitiesToShow === 'all'}
		<ActivityWrapper Activites={All} activities_type_kor={'전체활동'} />

		<!-- study -->
	{:else if $activitiesToShow === 'study'}
		<ActivityWrapper Activites={Studies} activities_type_kor={'스터디'} />

		<!-- project -->
	{:else if $activitiesToShow === 'project'}
		<ActivityWrapper Activites={Projects} activities_type_kor={'프로젝트'} />
	{/if}
</div>
