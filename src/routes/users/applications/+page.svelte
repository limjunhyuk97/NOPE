<script>
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import AppliedActivity from '$lib/components/users/AppliedActivity.svelte';

	export let data;

	const answers = data.answers;
</script>

<ContentWrapper title="지원 내역 조회 ({answers.length})">
	{#if answers === null || answers.length === 0}
		<div>아직 지원한 내역이 없습니다!</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each answers as { activities, id, status }}
				<AppliedActivity
					{id}
					title={activities.title}
					apply_status={status}
					activity_type_kor={activities.activity_types.type_kor}
				/>
			{/each}
		</div>
	{/if}
</ContentWrapper>
