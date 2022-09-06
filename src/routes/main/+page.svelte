<script>
	import Activity from '$lib/Activity.svelte';
	import moment from 'moment';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let activities = [];

	const getActivities = async () => {
		const { data } = await supabase
			.from('activities')
			.select('*,activities_info_images("*",images("*"))');
		activities = data;
	};
	onMount(async () => {
		await getActivities();
	});
</script>

<div class="w-full flex flex-col px-12 py-24 gap-5">
	<div class="text-3xl font-bold">스터디</div>
	<div class="flex gap-10 justify-between">
		{#each activities as { title, recruiting, start_at, end_at, activities_info_images }}
			<Activity
				imgUrl={activities_info_images[0].images.url}
				{title}
				{recruiting}
				startDate={moment(start_at).format('YYYY-MM-DD')}
				endDate={moment(end_at).format('YYYY-MM-DD')}
			/>
		{/each}
	</div>
</div>
