<script lang="ts">
	import type { Activities, Likes } from '$lib/types/main';
	import { activitiesToShow } from '$lib/stores';
	import ActivityWrapper from '$lib/components/main/ActivityWrapper.svelte';
	import { setContext } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;

	// 찜하기 관련 정보 : context로 전달
	const likes: ArrayLike<Likes> = data.likes;
	setContext('likes', likes);

	// 활동 관련 정보 : props로 전달 후 ActivityWrapper에서 뿌려주기
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
