<script lang="ts">
	import Activity from './components/Activity.svelte';
	import type { activities } from './+page.js';
	import { activitiesToShow } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import moment from 'moment';

	/** @type {import('./$types').PageData} */
	export let data;

	const Studies: ArrayLike<activities> = data.activities.filter(
		(el: activities) => el.activities_type.type === 'study'
	);
	const Projects: ArrayLike<activities> = data.activities.filter(
		(el: activities) => el.activities_type.type === 'project'
	);
</script>

<!-- Activity 컴포넌트 주입 -->
<div class="w-full">
	<!-- all -->
	{#if $activitiesToShow === 'all'}
		<div in:fade={{ duration: 500 }}>
			<div class="text-3xl mt-12">스터디</div>
			{#if Studies?.length}
				<div class="mt-8 grid grid-cols-3 gap-6">
					{#each Studies as { title, recruiting, start_at, end_at, status, activities_info_images }}
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
			{:else}
				<div class="mt-12">아직 진행중인 스터디가 없습니다!</div>
			{/if}
			<div class="text-3xl mt-12">프로젝트</div>
			{#if Projects?.length}
				<div class="mt-8 grid grid-cols-3">
					{#each Projects as { title, recruiting, start_at, end_at, status, activities_info_images }}
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
			{:else}
				<div class="mt-12">아직 진행중인 프로젝트가 없습니다!</div>
			{/if}
		</div>

		<!-- study -->
	{:else if $activitiesToShow === 'study'}
		<div in:fade={{ duration: 500 }}>
			<div class="text-3xl mt-12">스터디</div>
			{#if Studies?.length}
				<div class="mt-8 grid grid-cols-3 gap-6">
					{#each Studies as { title, recruiting, start_at, end_at, status, activities_info_images }}
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
			{:else}
				<div class="mt-12">아직 진행중인 스터디가 없습니다!</div>
			{/if}
		</div>

		<!-- project -->
	{:else if $activitiesToShow === 'project'}
		<div in:fade={{ duration: 500 }}>
			<div class="text-3xl mt-12">프로젝트</div>
			{#if Projects?.length}
				<div class="mt-8 grid grid-cols-3">
					{#each Projects as { title, recruiting, start_at, end_at, status, activities_info_images }}
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
			{:else}
				<div class="mt-12">아직 진행중인 프로젝트가 없습니다!</div>
			{/if}
		</div>
	{/if}
</div>
