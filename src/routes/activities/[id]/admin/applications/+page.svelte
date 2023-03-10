<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { toast } from '$lib/stores';
	import PageWrapper from '$lib/template/PageWrapper.svelte';
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import ApplicationCard from '$lib/components/applications/ApplicationCard.svelte';
	import { _changeParticipantStatus, _getActivityName, _getParticipants } from './+page';
	import { onMount } from 'svelte';

	export let data;

	const enrollStatus = ['admin', 'granted', 'quit'];
	const participatingStatus = ['denied', 'pending'];

	let {
		participants,
		activity_name: { title },
		activity_id
	} = { ...data };

	let applicants = [];
	let enrolled = [];

	const filterApplicants = () => {
		applicants = participants
			.filter((participant) => participatingStatus.some((status) => status === participant.status))
			.sort((applicant1, applicant2) => {
				if (applicant1.status === 'pending' && applicant2.status === 'denied') return -1;
				else return 1;
			});
	};

	const filterEnrolled = () => {
		enrolled = participants.filter((participant) =>
			enrollStatus.some((status) => status === participant.status)
		);
	};

	const changeParticipantStatusHalder = async (participant_id: string, status: string) => {
		const result = await _changeParticipantStatus(participant_id, status);
		if (result) $toast = '등록 실패';
		else {
			participants = await _getParticipants(activity_id);
			filterApplicants();
			filterEnrolled();
			$toast = '참가자 상태 변경 완료';
		}
	};

	const searchApplicants = (e: Event) => {
		console.log(e.target.value);
		applicants = data.participants.filter(
			(participant) =>
				participatingStatus.some((status) => status === participant.status) &&
				participant.users.name.includes(e.target.value)
		);
	};

	const searchEnrolled = (e: Event) => {
		console.log(e.target.value);
		enrolled = data.participants.filter(
			(participant) =>
				enrollStatus.some((status) => status === participant.status) &&
				participant.users.name.includes(e.target.value)
		);
	};

	onMount(() => {
		filterApplicants();
		filterEnrolled();
	});
</script>

<PageWrapper>
	<ContentWrapper title="지원 정보 관리" hasBack={true} />
	<div class="relative flex flex-1 w-full overflow-hidden">
		<div class="w-1/2 h-full px-4 border-r overflow-y-auto scrollbar-hide">
			<!-- 상단 이름 입력 -->
			<div
				class="absolute top-0 left-0 flex justify-between items-center w-1/2 px-4 mb-8 bg-white border-r"
			>
				<h1 class="w-48 text-xl font-semibold">지원자 목록 ({applicants.length})</h1>
				<div class="flex flex-1 items-center relative">
					<input
						value=""
						placeholder="이름을 입력하세요"
						type="text"
						class="w-full h-8 bg-gray-100 px-4 rounded outline-none placeholder:text-sm"
						on:keyup|preventDefault={searchApplicants}
					/>
					<div class="absolute right-2"><Icon icon="search" /></div>
				</div>
			</div>
			<!-- 지원자 목록 데이터 -->
			<div class="w-full h-16" />
			<div class="flex flex-col gap-4">
				{#if data.participants.length > 0}
					{#each applicants as participant}
						<ApplicationCard
							name={participant.users.name}
							status={participant.status}
							image_id={participant.users.images.storage_id}
							href="/activities/{activity_id}/admin/applications/{participant.id}"
						>
							<!-- 대기중인 지원자 -->
							{#if participant.status === 'pending'}
								<button
									class="hover:underline"
									on:click|preventDefault={(e) => {
										changeParticipantStatusHalder(participant.id, 'granted');
									}}>수락</button
								>
								<button
									class="hover:underline"
									on:click|preventDefault={(e) => {
										changeParticipantStatusHalder(participant.id, 'denied');
									}}>거절</button
								>
							{:else}
								<button
									class="hover:underline"
									on:click|preventDefault={(e) => {
										changeParticipantStatusHalder(participant.id, 'pending');
									}}>재심사</button
								>
							{/if}
						</ApplicationCard>
					{/each}
				{:else}
					<div class="flex flex-col w-full h-24 py-2 font-semibold">
						아직 참가 신청자가 없습니다!
					</div>
				{/if}
			</div>
		</div>
		<div class="w-1/2 h-full px-4 overflow-y-auto scrollbar-hide">
			<!-- 상단 이름 입력 -->
			<div
				class="absolute top-0 right-0 flex justify-between items-center w-1/2 px-4 mb-8 bg-white"
			>
				<h1 class="w-48 text-xl font-semibold">참가자 목록 ({enrolled.length})</h1>
				<div class="flex flex-1 items-center relative">
					<input type="text" class="w-full h-8 bg-gray-100 px-4 rounded outline-none" />
					<div class="absolute right-2"><Icon icon="search" /></div>
				</div>
			</div>
			<!-- 참가자 목록 데이터 -->
			<div class="w-full h-16" />
			<div class="flex flex-col gap-4">
				{#if enrolled.length > 0}
					{#each enrolled as participant}
						<ApplicationCard
							name={participant.users.name}
							status={participant.status}
							image_id={participant.users.images.storage_id}
							href="/activities/{activity_id}/admin/applications/{participant.id}"
						/>
					{/each}
				{:else}
					<div class="flex flex-col w-full h-24 py-2 font-semibold">
						아직 참가 신청자가 없습니다!
					</div>
				{/if}
			</div>
		</div>
	</div>
</PageWrapper>
