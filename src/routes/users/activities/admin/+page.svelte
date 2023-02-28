<script lang="ts">
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import ParticipatingActivity from '$lib/components/activities/ParticipatingActivity.svelte';

	export let data;
	const activityList = data.activityList;
</script>

<ContentLayer title="주최 활동 목록({activityList.length})">
	{#if activityList === null || activityList.length === 0}
		<div>아직 관리중인 활동이 없습니다!</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each activityList as { status, activities }}
				<ParticipatingActivity
					id={activities.id}
					pariticpant_status={status}
					title={activities.title}
					activity_status={activities.status}
				/>
			{/each}
		</div>
	{/if}
</ContentLayer>
