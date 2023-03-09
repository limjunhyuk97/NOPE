<script lang="ts">
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import Icon from '$lib/Icon.svelte';
	import { mypageSidebar, mypageSidebarParam } from '$lib/stores';
	import { getSignedUrl } from '$lib/utils';
	import { onDestroy } from 'svelte';
	import MDViewer from '$lib/components/common/MDViewer.svelte';
	import moment from 'moment';
	moment.locale('ko');

	export let data;

	const activity = data.activityData;
	const userStatus = data.userStatus;
	const activityForms = data.activityData.activity_forms.filter((form) => form.is_valid);

	const convertStatusToKor = (status: string) => {
		if (status === 'pending') return '활동 시작 전';
		if (status === 'finished') return '활동 종료됨';
		if (status === 'started') return '활동 시작됨';
		return 'ERR TYPE';
	};

	const convertConfirmationToKor = (status: string) => {
		if (status === 'confirmed') return '승인됨';
		if (status === 'pending') return '승인 대기중';
		if (status === 'denied') return '승인 거절됨';
	};

	const convertConfirmationColor = (status: string) => {
		if (status === 'confirmed') return 'text-black';
		if (status === 'pending') return 'text-gray-500';
		if (status === 'denied') return 'text-red-500';
	};

	$mypageSidebar = userStatus === 'super' ? Symbol.for('super') : Symbol.for('admin');
	$mypageSidebarParam = activity.id;

	onDestroy(() => {
		$mypageSidebar = Symbol.for('default');
	});
</script>

<ContentLayer title={activity.title} hasBack={true}>
	<div class="flex justify-center items-center w-full">
		{#await getSignedUrl(activity?.images?.storage_id)}
			<div class="w-64 min-h-[216px] rounded object-cover bg-gray-200" />
		{:then thumbnail}
			{#if thumbnail}
				<img src={thumbnail} alt={activity.title} class="w-64 min-h-[216px] rounded object-cover" />
			{:else}
				<div
					class="flex items-center justify-center w-64 min-h-[216px] rounded object-cover bg-gray-200 font-semibold"
				>
					이미지가 없습니다
				</div>
			{/if}
		{:catch}
			<div
				class="flex items-center justify-center w-64 h-72 rounded object-cover bg-gray-200 font-semibold"
			>
				네트워크 오류
			</div>
		{/await}
	</div>
	<div class="w-full h-1 my-12 bg-gray-100" />
	<div class="w-full px-4">
		<div class="flex flex-col items-start gap-4">
			<div class="flex items-start gap-4 text-xl font-bold">
				<h1>활동 정보</h1>
				<Icon icon="archive" />
			</div>
			<div class="flex gap-4">
				<h2 class="w-28 font-bold">활동 타입</h2>
				<span class="flex-1">{activity.activity_types.type_kor}</span>
			</div>
			<div class="flex gap-4">
				<h2 class="w-28 font-bold">간단한 설명</h2>
				<span class="flex-1">{activity.short_details}</span>
			</div>
			<div class="flex gap-4">
				<h2 class="w-28 font-bold">멤버 모집 여부</h2>
				<span class="flex-1">{activity.recruiting ? '예' : '아니오'}</span>
			</div>
			<div class="flex gap-4">
				<h2 class="w-28 font-bold">진행 상황</h2>
				<span class="flex-1">{convertStatusToKor(activity.status)}</span>
			</div>
			<div class="flex gap-4">
				<h2 class="w-28 font-bold">시작 일자</h2>
				<span class="flex-1">{moment(activity.start_at).format('YYYY년 MM월 DD일')}</span>
			</div>
			<div class="flex gap-4">
				<h2 class="w-28 font-bold">종료 일자</h2>
				<span class="flex-1">{moment(activity.end_at).format('YYYY년 MM월 DD일')}</span>
			</div>
			<div class="flex gap-4">
				<h2 class="w-28 font-bold">승인 여부</h2>
				<span class="flex-1 font-bold {convertConfirmationColor(activity.confirmation)}"
					>{convertConfirmationToKor(activity.confirmation)}</span
				>
			</div>
		</div>
		<div class="w-full h-1 my-12 bg-gray-100" />
		<div class="flex flex-col items-start gap-4">
			<div class="flex items-start gap-4 text-xl font-bold">
				<h1>설문지 질문</h1>
				<Icon icon="message-square" />
			</div>
			{#if activityForms.length > 0}
				{#each activityForms as form, id}
					<div class="flex gap-4">
						<h2 class="w-28 font-bold">질문 {id + 1}</h2>
						<span class="flex-1">{form.question}</span>
					</div>
				{/each}
			{:else}
				<div>아직 질문이 없습니다!</div>
			{/if}
		</div>
		<div class="w-full h-1 my-12 bg-gray-100" />
		<MDViewer mdTypeContent={activity.details} />
	</div>
</ContentLayer>
