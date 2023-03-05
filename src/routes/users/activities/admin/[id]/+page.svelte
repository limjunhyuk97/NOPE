<script lang="ts">
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import { mypageSidebar, mypageSidebarParam } from '$lib/stores';
	import { getSignedUrl } from '$lib/utils';
	import { onDestroy } from 'svelte';
	import MDViewer from '$lib/components/common/MDViewer.svelte';
	import moment from 'moment';
	moment.locale('ko');

	export let data;

	const activity = data.activityData;
	const userStatus = data.userStatus;

	const convertStatusToKor = (status: string) => {
		if (status === 'pending') return '활동 시작 전';
		if (status === 'finished') return '활동 종료됨';
		if (status === 'started') return '활동 시작됨';
		return 'ERR TYPE';
	};

	$mypageSidebar = userStatus === 'super' ? Symbol.for('super') : Symbol.for('admin');
	$mypageSidebarParam = activity.id;

	onDestroy(() => {
		$mypageSidebar = Symbol.for('default');
	});
</script>

<ContentLayer title={activity.title} hasBack={true}>
	<div class="w-full h-1 my-12 bg-gray-100" />
	<div class="w-full px-4">
		<div class="flex items-center gap-4">
			<div class="flex flex-col flex-1 gap-4 w-full h-full">
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
			</div>
			{#await getSignedUrl(activity.images.storage_id)}
				<div class="w-64 h-full min-h-[216px] rounded object-cover bg-gray-200" />
			{:then thumbnail}
				{#if thumbnail}
					<img
						src={thumbnail}
						alt={activity.title}
						class="w-64 h-full min-h-[216px] rounded object-cover"
					/>
				{:else}
					<div
						class="flex items-center justify-center w-64 h-full min-h-[216px] rounded object-cover bg-gray-200 font-semibold"
					>
						이미지가 없습니다
					</div>
				{/if}
			{:catch}
				<div
					class="flex items-center justify-center w-64 h-64 rounded object-cover bg-gray-200 font-semibold"
				>
					네트워크 오류
				</div>
			{/await}
		</div>
		<div class="w-full h-1 my-12 bg-gray-100" />
		<MDViewer mdTypeContent={activity.details} />
	</div>
</ContentLayer>
