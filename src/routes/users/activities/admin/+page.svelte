<script lang="ts">
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import ParticipatingActivity from '$lib/components/users/ParticipatingActivity.svelte';

	export let data;
	const activityList = data.activityList;
</script>

<ContentWrapper title="관리 활동 목록 ({activityList.length})">
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
					activity_type_kor={activities.activity_types.type_kor}
					isAdmin={true}
					isConfirmed={activities.confirmation}
				/>
			{/each}
		</div>
	{/if}
</ContentWrapper>
