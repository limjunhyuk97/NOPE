<script lang="ts">
	import type { Comments } from '$lib/types/activities';
	import { supabase } from '$lib/supabase';
	import { user, toast } from '$lib/stores';
	import Icon from '$lib/Icon.svelte';
	import Reply from '$lib/components/activities/Reply.svelte';

	export let comments: ArrayLike<Comments>;
	export let activity_id = '';

	// 댓글 다시 받아오기
	const getComments = async (id: string) => {
		const { data, error } = await supabase
			.from('activity_comments')
			.select('id, created_at, contents,  users(name, id, images(url))')
			.match({ activity_id: id })
			.order('created_at', { ascending: false });
		return error ? null : data;
	};

	// 댓글 삭제
	const handleReloadMessage = async (event: any) => {
		comments = await getComments(activity_id);
	};

	// 댓글 등록
	let newContent = '';
	const postComment = async () => {
		const { data, error } = await supabase
			.from('activity_comments')
			.insert([{ user_id: $user?.id, activity_id, contents: newContent }]);
		$toast = error ? '등록이 실패했습니다' : '댓글이 등록되었습니다!';
		if (!error) comments = await getComments(activity_id);
	};
</script>

<div class="w-1/3 h-full relative flex flex-col p-3">
	<h1 class="text-2xl">댓글 달기</h1>

	<div class="w-full h-full relative mt-7 overflow-y-auto ">
		{#each comments as comment}
			<Reply
				users={comment.users}
				contents={comment.contents}
				comment_id={comment.id}
				created_at={comment.created_at}
				on:reload_message={handleReloadMessage}
			/>
		{/each}

		{#if $user}<div class="h-6" /> {/if}
	</div>
	{#if $user}
		<form class="w-full pr-3 absolute bottom-0 flex items-center text-gray-500">
			<input
				type="text"
				class="w-full h-10 pl-3 mr-3 border rounded-2xl bg-gray-50 foucs:outline-none text-black"
				placeholder="여러분의 생각을 적어주세요!"
				bind:value={newContent}
			/>
			<button
				on:click|preventDefault={async () => {
					await postComment();
					newContent = '';
				}}
				class="p-1.5 bg-gray-300 rounded-full"><Icon icon="arrow-up" /></button
			>
		</form>
	{/if}
</div>
