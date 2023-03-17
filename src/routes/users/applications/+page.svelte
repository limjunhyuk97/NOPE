<script lang="ts">
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import AppliedActivity from '$lib/components/users/AppliedActivity.svelte';
	import Icon from '$lib/Icon.svelte';
	import { slide } from 'svelte/transition';

	export let data;

	const answers = data.answers;

	let filterClicked = false;
	let filteredStatus = { status: 'all', name: '전체 지원서' };

	const selectFilter = (status: string, name: string) => {
		return (e: Event) => {
			filteredStatus = { status, name };
			filterClicked = false;
		};
	};

	$: filteredAnswers =
		filteredStatus.status === 'all'
			? answers
			: answers.filter((answer) => answer.status === filteredStatus.status);
</script>

<ContentWrapper title="지원 내역 조회 ({answers.length})">
	<!-- 필터 -->
	<button
		class="flex items-center justify-between w-32 px-2 py-2 mb-4 bg-gray-100 rounded-lg"
		on:click|preventDefault={() => (filterClicked = !filterClicked)}
	>
		<span>{filteredStatus.name}</span>
		{#if filterClicked}
			<Icon icon="chevron-up" />
		{:else}
			<Icon icon="chevron-down" />{/if}
	</button>
	{#if filterClicked}
		<div
			class="absolute flex flex-col gap-3 w-32 p-3 rounded bg-gray-100 z-10"
			transition:slide|local={{ duration: 300 }}
		>
			<button on:click|preventDefault={selectFilter('all', '전체')}>전체 지원서</button>
			<button on:click|preventDefault={selectFilter('pending', '대기중')}>참가 대기중</button>
			<button on:click|preventDefault={selectFilter('granted', '참가중')}>참가중</button>
			<button on:click|preventDefault={selectFilter('amdin', '관리자')}>관리자</button>
			<button on:click|preventDefault={selectFilter('ejected', '퇴장됨')}>퇴출</button>
			<button on:click|preventDefault={selectFilter('quit', '탈퇴함')}>퇴장</button>
		</div>
	{/if}
	<!-- 본문 -->
	{#if filteredAnswers === null || filteredAnswers.length === 0}
		<div>관련 지원 내역이 없습니다!</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each filteredAnswers as { activities, id, status }}
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
