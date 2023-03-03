<script lang="ts">
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import ParticipatingActivity from '$lib/components/activities/ParticipatingActivity.svelte';

	export let data;
	const activityList = data.activityList;
</script>

<ContentLayer title="참여 활동 목록({activityList.length})">
	{#if activityList === null || activityList.length === 0}
		<div>아직 참여중인 활동이 없습니다!</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each activityList as { status, activities }}
				<ParticipatingActivity
					id={activities.id}
					pariticpant_status={status}
					title={activities.title}
					activity_status={activities.status}
					activity_type_kor={activities.activity_types.type_kor}
					isAdmin={false}
				/>
			{/each}
		</div>
	{/if}
</ContentLayer>
