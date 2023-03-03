<script lang="ts">
	import { handleLike, handleUnLike } from './Activity';
	import { slide, fade } from 'svelte/transition';
	import { user, toast } from '$lib/stores';
	import { getSignedUrl } from '$lib/utils';
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
	export let liked = true;
	export let activity_types;

	// 좋아요 handler
	const likeHandler = async () => {
		liked = !liked;
		const result = liked ? await handleLike($user?.id, id) : await handleUnLike($user?.id, id);
		$toast = result ? (liked ? '찜하기 완료' : '찜한항목 제거') : '찜하기 실패';
	};

	// 좋아요 여부 확인 (찜하기에서는 무조건 찜한 항목 띄워주기)
	export let isLikePage = false;

	// 간단한 설명 보여주기
	$: hoverExplanation = false;
</script>

<a
	href="/activities/{id}"
	class="w-full relative h-[390px] mb-12 shadow-2xl rounded-lg overflow-hidden text-sm font-semibold {isLikePage &&
	!liked
		? 'hidden '
		: ''}"
>
	<!-- 상단 : 이미지 노출부분 -->
	{#if !hoverExplanation}
		<div
			class="w-full h-64 flex justify-center items-center bg-gray-100 lg:rounded-t-lg overflow-hidden"
			in:fade|local={{ duration: 400 }}
			out:slide|local={{ duration: 400 }}
		>
			{#await getSignedUrl(imgUrl)}
				<div
					class="flex items-center justify-center w-full h-full hover:scale-125 duration-200 text-lg"
				>
					{title}
				</div>
			{:then image}
				{#if image}
					<img
						src={image}
						alt={title}
						class="w-full h-full scale-110 hover:scale-125 duration-200 object-cover"
					/>
				{:else}
					<div
						class="flex items-center justify-center w-full h-full hover:scale-125 duration-200 text-lg font-bold"
					>
						{title}
					</div>
				{/if}
			{:catch error}
				<div
					class="flex items-center justify-center w-full h-full hover:scale-125 duration-200 text-lg font-bold"
				>
					{title}
				</div>
			{/await}
		</div>
	{/if}
	<!-- 하단 : 설명부분 -->
	<div
		class="w-full h-full px-4 flex flex-col"
		on:mouseenter={() => {
			hoverExplanation = true;
		}}
		on:mouseleave={(e) => {
			hoverExplanation = false;
		}}
	>
		<!-- 활동 설명 -->
		<div class="flex justify-between items-center font-bold">
			<p class="w-full mt-2 text-lg {hoverExplanation ? '' : 'truncate'}">
				{title}
			</p>
		</div>

		<!-- 활동 진행 상태 -->
		<div class="mt-3">
			<div>
				{activity_types.type_kor} / {#if recruiting}
					<span class="mt-1 font-semibold text-green-600">지원 가능</span>
				{:else}
					<span class="mt-1 font-semibold text-red-600">지원 불가</span>
				{/if}
			</div>
			<!-- 지원 가능 여부 -->
		</div>

		<!-- 시작일, 종료일 -->
		<div class="mt-3">시작일 {moment(startDate).format('YYYY.MM.DD')}</div>
		<div class="mt-1">종료일 {moment(endDate).format('YYYY.MM.DD')}</div>
		{#if hoverExplanation}
			<p class="w-full h-full pt-8 text-sm text-ellipsis" in:fade={{ duration: 800 }}>
				{short_details}
			</p>
		{/if}
	</div>
	<!-- 좋아요 인터페이스 -->
	{#if $user}
		<button
			class="ml-2 absolute bottom-3 right-3"
			on:click|preventDefault={async () => {
				await likeHandler();
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
