<script lang="ts">
	import type { Activities } from '$lib/types/likes';
	import { supabase } from '$lib/supabase';
	import { slide, fade } from 'svelte/transition';
	import { user, toast } from '$lib/stores';
	import Icon from '$lib/Icon.svelte';

	export let activities: Activities;

	import moment from 'moment';
	moment.locale('ko');

	// 찜하기 제거 위한 함수
	const postDisLike = async (user_id: string, activity_id: string) => {
		const { data, error } = await supabase.from('likes').delete().match({ user_id, activity_id });
		if (!error) return true;
		else return false;
	};

	let liked = true;
	const likeBtn = async () => {
		const result = await postDisLike($user?.id, activities.id);
		if (result) liked = false;
		$toast = result ? '찜한항목 제거' : '찜하기 실패';
	};

	// 진행상태 메시지 가공 위한 객체
	type statusDivType = { content: string; color: string };
	const statusVariation: { [key: string]: statusDivType } = {
		pending: { content: '활동 시작전', color: 'text-gray-200' },
		started: { content: '활동 진행중', color: 'text-green-600' },
		finished: { content: '활동 종료', color: 'text-red-600' }
	};

	// 모집중 메시지
	const recruitingMSG = () => {
		return activities.recruiting
			? `<div class="mt-1 text-blue-600">지원 가능</div>`
			: `<div class="mt-1 text-red-600">지원 불가</div>`;
	};

	// 진행상태 메시지
	const statusMSG = () => {
		return `<div class="mt-3 ${statusVariation[activities.status].color}">${
			statusVariation[activities.status].content
		}</div>`;
	};

	// 간단한 설명 보여주기
	let hovering = false;
</script>

{#if liked}
	<a
		href="/activities/{activities.id}"
		class="w-full relative 2xl:h-[524px] lg:h-[434px] h-[524px] mb-12 shadow-2xl rounded-lg overflow-hidden {liked
			? ''
			: 'hidden'}"
		out:fade|local
	>
		{#if !hovering}
			<div
				class="w-full 2xl:h-96 lg:h-72 h-96 flex justify-center items-center bg-gray-100 lg:rounded-t-lg overflow-hidden"
				in:fade|local={{ duration: 400 }}
				out:slide|local={{ duration: 600 }}
			>
				<img
					src={activities.images.url}
					alt={activities.title}
					class="w-full hover:scale-125 duration-200"
				/>
			</div>
		{/if}
		<div
			class="w-full h-full px-4 flex flex-col text-xs"
			on:mouseenter={() => {
				hovering = true;
			}}
			on:mouseleave={(e) => {
				hovering = false;
			}}
		>
			<div class="flex justify-between items-center">
				<p class="w-full mt-2 text-lg {hovering ? '' : 'truncate'}">
					{activities.title}
				</p>
			</div>

			{@html statusMSG()}
			{@html recruitingMSG()}
			<div class="mt-3">시작일 {moment(activities.start_at).format('YYYY.MM.DD')}</div>
			<div class="mt-1">종료일 {moment(activities.end_at).format('YYYY.MM.DD')}</div>
			{#if hovering}
				<p class="w-full h-max pt-8 text-xs text-ellipsis" in:fade={{ duration: 800 }}>
					{activities.short_details}
				</p>
			{/if}
		</div>
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
{/if}
