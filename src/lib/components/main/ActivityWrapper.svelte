<script lang="ts">
	import Activity from '$lib/components/main/Activity.svelte';
	import type { Activities } from '$lib/types/main';
	import { fade } from 'svelte/transition';
	import moment from 'moment';

	export let activities_type_kor = '전체활동';
	export let Activites: ArrayLike<Activities>;
</script>

<div in:fade={{ duration: 500 }}>
	<div class="lg:mt-8 mb-4 lg:text-3xl text-xl">{activities_type_kor}</div>
	{#if Activites?.length}
		<div class="mb-8 grid lg:grid-cols-3 2xl:gap-10 lg:gap-3">
			{#each Activites as { title, recruiting, start_at, end_at, status, activities_info_images, activities_type, details, short_details }}
				<Activity
					imgUrl={activities_info_images[0].images.url}
					type={activities_type.type_kor}
					href="/"
					{title}
					{recruiting}
					{status}
					{details}
					{short_details}
					startDate={moment(start_at).format('YYYY-MM-DD')}
					endDate={moment(end_at).format('YYYY-MM-DD')}
				/>
			{/each}
		</div>
	{:else}
		<div class="mt-12">아직 진행중인 활동이 없습니다!</div>
	{/if}
</div>
