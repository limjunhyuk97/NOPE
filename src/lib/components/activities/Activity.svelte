<script lang="ts">
	import type { Likes } from '$lib/types/activities';
	import { handleLike, handleUnLike } from './Activity';
	import { ACTIVITY_STATUS } from '$lib/constants';
	import { slide, fade } from 'svelte/transition';
	import { user, toast } from '$lib/stores';
	import Icon from '$lib/Icon.svelte';
	import moment from 'moment';
	moment.locale('ko');

	// 필요한 데이터 주입
	export let imgUrl = '';
	export let title = '';
	export let id = '';
	export let short_details = '';
	export let recruiting = true;
	export let startDate = '';
	export let endDate = '';
	export let status = '';
	export let liked = true;

	// 좋아요 핸들러
	const likeBtn = async () => {
		liked = !liked;
		const result = liked ? await handleLike($user?.id, id) : await handleUnLike($user?.id, id);
		console.log(result);
		$toast = result ? (liked ? '찜하기 완료' : '찜한항목 제거') : '찜하기 실패';
	};

	// 좋아요 여부 확인 (찜하기에서는 무조건 찜한 항목 띄워주기)
	export let isLikePage = false;

	// 진행상태 메시지 가공 위한 객체
	const statusVariation: { [key: string]: { content: string; color: string } } = {
		[ACTIVITY_STATUS.PENDING]: { content: '활동 시작전', color: 'text-gray-200' },
		[ACTIVITY_STATUS.STARTED]: { content: '활동 진행중', color: 'text-green-600' },
		[ACTIVITY_STATUS.FINISHED]: { content: '활동 종료', color: 'text-red-600' }
	};

	// 간단한 설명 보여주기
	let hovering = false;
</script>

<a
	href="/activities/{id}"
	class="w-full relative 2xl:h-[524px] lg:h-[440px] h-[400px] mb-12 shadow-2xl rounded-lg overflow-hidden {isLikePage &&
	!liked
		? 'hidden '
		: ''}"
>
	<!-- 상단 : 이미지 노출부분 -->
	{#if !hovering}
		<div
			class="w-full 2xl:h-96 lg:h-72 h-64 flex justify-center items-center bg-gray-100 lg:rounded-t-lg overflow-hidden"
			in:fade|local={{ duration: 400 }}
			out:slide|local={{ duration: 600 }}
		>
			{#if imgUrl}
				<img src={imgUrl} alt={title} class="w-full hover:scale-125 duration-200" />
			{:else}
				<div class="flex items-center justify-center w-full h-full hover:scale-125 duration-200">
					{title}
				</div>
			{/if}
		</div>
	{/if}
	<!-- 하단 : 설명부분 -->
	<div
		class="w-full h-full px-4 flex flex-col text-xs"
		on:mouseenter={() => {
			hovering = true;
		}}
		on:mouseleave={(e) => {
			hovering = false;
		}}
	>
		<!-- 활동 설명 -->
		<div class="flex justify-between items-center">
			<p class="w-full mt-2 text-lg {hovering ? '' : 'truncate'}">
				{title}
			</p>
		</div>

		<!-- 활동 진행 상태 -->
		<div class="mt-3 ${statusVariation[status].color}">{statusVariation[status].content}</div>

		<!-- 지원 가능 여부 -->
		{#if recruiting}
			<div class="mt-1 text-blue-600">지원 가능</div>
		{:else}
			<div class="mt-1 text-red-600">지원 불가</div>
		{/if}

		<!-- 시작일, 종료일 -->
		<div class="mt-3">시작일 {moment(startDate).format('YYYY.MM.DD')}</div>
		<div class="mt-1">종료일 {moment(endDate).format('YYYY.MM.DD')}</div>
		{#if hovering}
			<p class="w-full h-full pt-8 text-xs text-ellipsis" in:fade={{ duration: 800 }}>
				{short_details}
			</p>
		{/if}
	</div>
	<!-- 좋아요 인터페이스 -->
	{#if $user}
		<button
			class="ml-2 absolute bottom-3 right-3"
			on:click|preventDefault={async () => {
				await likeBtn();
			}}
		>
			<Icon
				icon="heart-fill"
				size={16}
				fill={liked ? 'red' : 'none'}
				stroke={liked ? '' : 'black'}
			/>
		</button>
	{/if}
</a>
