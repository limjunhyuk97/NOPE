<script lang="ts">
	import type { ActivityCard } from '$lib/types/activities';
	import Icon from '$lib/Icon.svelte';
	import { USER_STATUS } from '$lib/constants';
	import { user, toast } from '$lib/stores';
	import { _getCommentData, _writeComment, _likeActivity, _unlikeActivity } from './+page';
	import Comment from '$lib/components/comment/Comment.svelte';
	import MDViewer from '$lib/components/common/MDViewer.svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;

	const activityData: ActivityCard = data.activityData;
	const activityImage = data.activityImage;
	const userStatus = Symbol.for(data?.userStatus ? data?.userStatus : USER_STATUS.LOGOUT);

	let userLike = data.userLike;
	let comments = data.comments;

	// reload comments
	const reloadComments = async () => {
		comments = await _getCommentData(activityData.id);
	};

	let commentBlock;
	let myComment = '';

	// write comment
	const writCommentHandler = async () => {
		if (myComment === '') {
			$toast = '내용을 입력해주세요!';
			return;
		}
		const written = await _writeComment($user?.id, activityData.id, myComment);
		if (written) {
			myComment = '';
			await reloadComments();
			commentBlock.scrollTop = commentBlock.scrollHeight;
		} else {
			$toast = '댓글 달기 실패';
		}
	};

	// handle like
	const likeHandler = async () => {
		userLike = !userLike;
		const result = userLike
			? await _likeActivity($user?.id, activityData.id)
			: _unlikeActivity($user?.id, activityData.id);
		$toast = result ? (userLike ? '찜하기 완료' : '찜한항목 제거') : '찜하기 실패';
	};
</script>

<div class="relative flex w-full h-full">
	<div class="w-3/4 h-full overflow-y-auto scrollbar-hide">
		<div class="relative w-full h-40">
			{#if activityImage}
				<img
					class="top-0 left-0 w-full h-40 object-cover"
					src={activityImage}
					alt={activityData.title}
				/>
			{:else}
				<div class="top-0 left-0 w-full h-40 opacity-40 bg-gray-300" />
			{/if}
			<h1 class="absolute bottom-0 left-12 w-fit py-3 px-5 text-2xl font-bold bg-white rounded-t">
				{activityData.title}
			</h1>
			<button class="absolute bottom-4 right-4" on:click|preventDefault={likeHandler}>
				{#if $user}
					{#if userLike}
						<Icon icon="heart-fill" fill="red" stroke="none" />
					{:else}
						<Icon icon="heart-fill" fill="#fcfcfc" stroke="none" />
					{/if}
				{/if}
			</button>
		</div>
		<div class="p-12">
			<div class="w-full bg-white">
				<MDViewer mdTypeContent={activityData.details} />
			</div>
			<div class="flex gap-12 mt-12 text-xl bg-white">
				{#if activityData.recruiting}
					{#if userStatus === USER_STATUS.NOTAPPLIED}
						<button class="text-green-700 hover:underline">참여 신청하기</button>
						<button>세션 둘러보기</button>
					{:else if userStatus === USER_STATUS.APPLIED}
						<div class="text-green-700">참여 요청완료</div>
						<button class="hover:underline">세션 둘러보기</button>
					{:else if userStatus === USER_STATUS.LOGOUT}
						<button class="hover:underline">세션 둘러보기</button>
					{:else}
						<button class="text-green-700 hover:underline">세션 목록으로</button>
					{/if}
					<!-- 모집중이 아니라면 -->
				{:else}
					<button class="duration-300 hover:underline">세션 둘러보기 (모집 종료)</button>
				{/if}
			</div>
		</div>
	</div>
	<div
		class="w-1/4 h-screen border border-l overflow-y-auto scrollbar-hide"
		bind:this={commentBlock}
	>
		<h1 class="sticky top-0 flex items-center h-16 px-6 text-xl font-bold bg-white z-10 border-b-2">
			댓글
		</h1>
		<div class="flex flex-col gap-6 w-full h-activity-comments py-3 ">
			{#if comments.length > 0}
				{#each comments as comment (comment.id)}
					<Comment {comment} on:reload={reloadComments} />
				{/each}
			{:else}
				<div class="px-6 py-3">댓글이 없습니다!</div>
			{/if}
		</div>
		{#if $user}
			<form
				class="sticky bottom-0 flex items-center justify-center w-full h-16 z-10 bg-white border-t-2"
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
