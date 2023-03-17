<script lang="ts">
	import PageWrapper from '$lib/template/PageWrapper.svelte';
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import { _getResume, _getUser, _changeParticipantStatus } from './+page';
	import { applyStatusColor, applyStatus, getSignedUrl } from '$lib/utils';
	import { toast } from '$lib/stores';
	import { onMount } from 'svelte';
	export let data;

	const outStatus = ['quit', 'ejected'];

	let { participantData: user, resumeData: resume, participant_id } = { ...data };
	let userImage = null;

	const changeParticipantStatusHalder = async (participant_id: string, status: string) => {
		const result = await _changeParticipantStatus(participant_id, status);
		if (result) $toast = '등록 실패';
		else {
			user = await _getUser(participant_id);
			resume = await _getResume(participant_id);
			$toast = '참가자 상태 변경 완료';
		}
	};

	onMount(async () => {
		userImage = await getSignedUrl(user?.users.images?.storage_id);
	});
</script>

<PageWrapper>
	<ContentWrapper title={user?.users.name + ' 님의 지원서'} hasBack={true} />
	<div class="flex flex-1 w-full overflow-hidden">
		<!-- 지원자 소개 -->
		<section class="flex flex-col gap-8 w-1/2 border-r py-4 pr-8 overflow-y-auto">
			<div class="flex flex-col items-center gap-4">
				{#if userImage === null}
					<div class="w-32 h-32 xl:w-48 xl:h-48 rounded-full bg-gray-100" />
				{:else}
					<img
						src={userImage}
						alt={user?.users.name}
						class="w-32 h-32 xl:w-48 xl:h-48 rounded-full object-cover"
					/>
				{/if}
				<div class="flex gap-3 text-lg">
					<span>{user?.users.name}</span>
					<span>•</span>
					<span class="{applyStatusColor(user.status)} font-semibold"
						>{applyStatus(user.status)}</span
					>
				</div>
			</div>
			<div>
				<h2 class="text-xl font-semibold">지원자 자기소개</h2>
				{#if user?.users.descriptions.length > 0}
					<p class="p-4 mt-4 bg-gray-100 rounded">{user?.users.descriptions}</p>
				{:else}
					<span class="block mt-4">작성한 자기소개가 없습니다!</span>
				{/if}
			</div>
			<div>
				<h2 class="text-xl font-semibold">지원자 관심스택</h2>
				<!-- 관심 스택이 있는 경우 -->
				{#if user?.users.user_stacks.length > 0}
					<div class="grid grid-cols-2 gap-3 mt-4">
						{#each user?.users.user_stacks as { stacks }}
							<div class="flex flex-col gap-2 items-center">
								<img
									src={stacks.url}
									alt=""
									class="w-full h-12 bg-gray-100 object-cover rounded hover:object-contain"
								/>
								<span class="text-xs font-semibold">{stacks.name}</span>
							</div>
						{/each}
					</div>
					<!-- 관심 스택이 없는 경우 -->
				{:else}
					<span class="block mt-4">등록된 관심 스택이 없습니다!</span>
				{/if}
			</div>
		</section>
		<!-- 지원자 자기소개서 -->
		<section class="flex flex-col gap-8 w-1/2 py-4 pl-8 overflow-y-auto">
			<h1 class="text-xl font-semibold">지원서</h1>
			<div class="flex flex-col gap-4">
				{#each resume as resume, id}
					<h2 class="font-semibold">{id + 1}. {resume.activity_forms.question}</h2>
					<p class="p-3 rounded bg-gray-100">{resume.answer}</p>
				{/each}
			</div>
		</section>
	</div>
	<!-- 퇴출되거나, 나간 사용자 아니면 보여주기 -->
	{#if !outStatus.some((status) => status === user.status)}
		<div class="flex justify-center gap-6 pt-4 mr-4">
			<!-- pending -->
			{#if user.status === 'pending'}
				<button
					class="text-xl font-semibold hover:underline"
					on:click|preventDefault={(e) => {
						changeParticipantStatusHalder(participant_id, 'granted');
					}}>수락</button
				>
				<button
					class="text-xl font-semibold hover:underline"
					on:click|preventDefault={(e) => {
						changeParticipantStatusHalder(participant_id, 'denied');
					}}>거절</button
				>
				<!-- denied -->
			{:else if user.status === 'denied'}
				<button
					class="text-xl font-semibold hover:underline"
					on:click|preventDefault={(e) => {
						changeParticipantStatusHalder(participant_id, 'pending');
					}}>재심사</button
				>
				<!-- granted -->
			{:else if user.status === 'granted'}
				<button
					class="text-xl font-semibold hover:underline"
					on:click|preventDefault={(e) => {
						changeParticipantStatusHalder(participant_id, 'admin');
					}}>관리자지정</button
				>
				<!-- admin -->
			{:else if user.status === 'admin'}
				<button
					class="text-xl font-semibold hover:underline"
					on:click|preventDefault={(e) => {
						changeParticipantStatusHalder(participant_id, 'granted');
					}}>관리자해제</button
				>
			{/if}
			{#if user.status === 'admin' || user.status === 'granted'}
				<button
					class="text-xl font-semibold hover:underline"
					on:click|preventDefault={(e) => {
						changeParticipantStatusHalder(participant_id, 'ejected');
					}}>활동퇴출</button
				>
			{/if}
		</div>
	{/if}
</PageWrapper>
