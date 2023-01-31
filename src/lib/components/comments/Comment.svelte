<script lang="ts">
	import type { Comment } from '$lib/types/activities';
	import { handleDelete } from './Comment';
	import Icon from '$lib/Icon.svelte';
	import UserInfo from './UserInfo.svelte';
	import { getSignedUrl } from '$lib/utils';
	import { user, toast } from '$lib/stores';
	import moment from 'moment/min/moment-with-locales';
	import { createEventDispatcher } from 'svelte';
	import type { Mouse } from '@playwright/test';
	moment.locale('ko');

	export let comment: Comment;
	const editable = $user?.id === comment.users.id;
	console.log(comment);

	// 댓글 리로딩
	const reloadComment = createEventDispatcher();

	// 삭제 버튼 handler
	const deleteHandler = async (id: string) => {
		const result = await handleDelete({ comment_id: id });
		reloadComment('reload');
		$toast = result ? '삭제 되었습니다.' : '삭제 오류';
	};

	// 타 사용자 정보 모달
	let showUserDetails = false;
	$: mousePosition = { x: 0, y: 0 };
	const handleMousemove = (event: MouseEvent) => {
		mousePosition.x = event.clientX;
		mousePosition.y = event.clientY;
	};
	const mouseenterHandler = (event: MouseEvent) => {
		showUserDetails = true;
		handleMousemove(event);
	};
	const mouseleaveHandler = (event: MouseEvent) => {
		showUserDetails = false;
	};
</script>

<div class="flex flex-col gap-2 w-full px-6">
	<div
		class="flex items-center gap-4 w-full"
		on:mouseenter={mouseenterHandler}
		on:mouseleave={mouseleaveHandler}
	>
		{#await getSignedUrl(comment.users.images?.storage_id)}
			<div class="w-9 h-9 p-1 rounded-full bg-gray-300" />
		{:then image}
			{#if image}
				<img src={image} alt="profile" class="w-10 h-10 rounded-full object-cover" />
			{:else}
				<div class="p-1 rounded-full bg-gray-500">
					<Icon icon="user" size={28} stroke_width={1.5} fill={'white'} />
				</div>
			{/if}
		{:catch error}
			<div class="p-1 rounded-full border border-black"><Icon icon="user" size={28} /></div>
		{/await}
		<span class="xl:w-36 w-24 truncate">{comment.users.name}</span>
	</div>
	<div class="flex flex-col gap-1">
		<p class="break-all">{comment.contents}</p>
		<div class="flex gap-1 items-center text-xs text-gray-600">
			<span>{moment(comment.created_at).fromNow()}</span>
			{#if editable}
				<span class="text-xs">•</span>
				<button
					on:click|preventDefault={async () => {
						await deleteHandler(comment.id);
					}}>삭제</button
				>
			{/if}
		</div>
	</div>
</div>

{#if showUserDetails}
	<UserInfo users={comment.users} position={mousePosition} />
{/if}
