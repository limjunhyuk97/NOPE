<script lang="ts">
	import type { ActivityCard } from '$lib/types/activities';
	import Icon from '$lib/Icon.svelte';
	import { USER_STATUS } from '$lib/constants';
	import { user, toast } from '$lib/stores';
	import { _getCommentData, _writeComment } from './+page';
	import Comment from '$lib/components/comments/Comment.svelte';
	import { Viewer } from 'bytemd';

	/** @type {import('./$types').PageData} */
	export let data: any;

	const activityData: ActivityCard = data.activityData;
	const activityImage = data.activityImage;
	const userStatus = Symbol.for(data?.userStatus ? data?.userStatus : USER_STATUS.LOGOUT);

	let comments = data.comments;

	// reload comments
	const reloadComments = async () => {
		comments = await _getCommentData(activityData.id);
	};

	let myComment = '';

	// write comment
	const writCommentHandler = async () => {
		if (myComment === '') {
			$toast = '내용을 입력해주세요!';
			return;
		}
		await _writeComment($user?.id, activityData.id, myComment);
		await reloadComments();
	};
</script>

<div class="relative flex w-full h-screen">
	<div class="relative w-3/4 h-full overflow-y-auto scrollbar-hide">
		{#if activityImage}
			<img
				class="top-0 left-0 w-full h-40 object-cover"
				src={activityImage}
				alt={activityData.title}
			/>
		{:else}
			<div class="top-0 left-0 w-full h-40 bg-gray-400 opacity-40" />
		{/if}
		<div class="absolute top-16 p-12">
			<h1 class="w-fit p-5 text-3xl bg-white rounded-t">{activityData.title}</h1>
			<div class="min-h-[80%] md-body bg-white"><Viewer value={activityData.details} /></div>
			<div class="flex gap-12 text-xl bg-white">
				<!-- 모집중 이라면 -->
				{#if activityData.recruiting}
					{#if userStatus === USER_STATUS.NOTAPPLIED}
						<button class="text-green-700 hover:scale-110 duration-300">참여 신청하기</button>
						<button class="hover:scale-110 duration-300">세션 둘러보기</button>
					{:else if userStatus === USER_STATUS.APPLIED}
						<button class="text-green-700 hover:scale-110 duration-300">참여 요청완료</button>
						<button class="hover:scale-110 duration-300">세션 둘러보기</button>
					{:else if userStatus === USER_STATUS.LOGOUT}
						<button class="hover:scale-110 duration-300">세션 둘러보기</button>
					{:else}
						<button class="text-green-700 hover:scale-110 duration-300">세션 목록으로</button>
					{/if}
					<!-- 모집중이 아니라면 -->
				{:else}
					<button class="hover:scale-110 duration-300">세션 둘러보기</button>
				{/if}
			</div>
		</div>
	</div>
	<div class="w-1/4 h-screen border border-l overflow-y-auto scrollbar-hide">
		<h1 class="sticky top-0 flex items-center h-16 px-6 text-xl bg-white">댓글</h1>
		<div class="flex flex-col gap-6 w-full min-h-full py-3 ">
			{#if comments.length > 0}
				{#each comments as comment}
					<Comment {comment} on:reload={reloadComments} />
				{/each}
			{:else}
				<div class="px-6 py-3">댓글이 없습니다!</div>
			{/if}
		</div>
		{#if $user}
			<form
				class="sticky bottom-0 flex items-center justify-center w-full h-16 z-10 border-t"
				on:submit|preventDefault={writCommentHandler}
			>
				<input
					type="text"
					placeholder="댓글을 입력해주세요!"
					class="flex items-center w-11/12 p-2 border rounded-2xl focus:outline-none"
					bind:value={myComment}
				/>
				<div class="absolute right-4"><Icon icon="chevron-right" size={18} fill="gray" /></div>
			</form>
		{/if}
	</div>
</div>
